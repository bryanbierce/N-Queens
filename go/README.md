## Thoughts on Go

This has been tremendously easy to learn. In a single morning before work I was able to get comfortable enough with the syntax and the data structures to port my sequential JS solution.

The concurrency section of the go tour is incredibly brief and easy to get through. Initial tests:
* making the diagonal checks concurrent doubles the execution time of the solution at n = 8.
  * Waited over a minute on 14 and computer began reving so I canceled the operation(sequential does it in 9s)

##### Initial
* Reused model from webworkers
  * each arm of recursion stemming from a first row square gets its own go routine
  * pass a pointer to the solution count to be incremented on solution found
* Maintained 6ms up to n=12, it seems I have a race condition.
  * Sometimes result count is incremented before the close messages from all the supervisors, sometimes not and the returned solution count is wrong

##### First Refactor
* Replaced the solutionCount pointer with a count channel. Race condition eliminated since the channel send blocks until it can be received the current func does not return up the chain to the top and send the done channel message until the count message is first received.
* solution is now 107ms at n = 12 but solution is deterministic
