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
* n = 15 is 20s vs 60 for sequential :D, n = 16 is 135s vs 355s

##### Second Refactor
* All recursive calls changed to go routines. Done channel changed to increment the go-routine counter on each routine open, and close on each close
* Very interesting results, I suspect I might have a bug somewhere. It now completes n =12 in 9ms, so under 10% the time of previous solution. however at n = 14 it seems to explode. being that the previous did it in something udner 20s I gave up waiting at a little over 2 mins.
  * First possibility: I have a bug. Probability: reasonably high.
  * Second possibility: The garabage collectors is being asked to do an obscene amount of work and might be hanging the processes? To be able to make each recursive call a go routine each call has to have its own copy of the board just like it does the column array. This board is then thrown away at the end of each go routine. That becomes a pretty big pile of trash, not to mention the O(n^2) boardCopy(board)
* Attempted to have it run the recursive steps on every other row as go routines. But this seemed to create a race condition and it was finishing with at best 20 out of some 2000 expected results on n = 11
