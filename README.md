# Spawn [![Build Status](https://travis-ci.com/AhmedAbuelaish/spawn-react-redux.svg?branch=master)](https://travis-ci.com/AhmedAbuelaish/spawn-react-redux)
The main driver for this project was to generate a large amount of data to test the limits of React, Redux, and the browser and along the way create something that resembles art.

## Requirements

1. Use the least amount of libraries as possible to keep all the code exposed and be able to optimize it.

2. Use DOM elements unless rendering limits performance then switch to canvas

3. Create a random set of nodes by using a set of user-defined settings to 'control the chaos'

### Dependencies

**App development**

-[create-react-app](https://www.npmjs.com/package/create-react-app)

-[react-redux](https://www.npmjs.com/package/react-redux)

**Components**

-[react-minimal-pie-chart](https://www.npmjs.com/package/react-minimal-pie-chart)

### Results

-The main performance limitation was the logic/javascript, which still has some room for improvement for smoother animation and handling larger number of nodes (current limit ~50,000 nodes but also depends on the cpu's processing power)

-Using a webworker may work but what limited the performance of the webworker seemed to be react-redux's handling of multiple consecutive triggers of *setState*

### Bonus
![alt text](https://github.com/AhmedAbuelaish/spawn-react-redux/blob/master/images/Capture.PNG?raw=true)
![alt text](https://github.com/AhmedAbuelaish/spawn-react-redux/blob/master/images/Capture2.PNG?raw=true)
![alt text](https://github.com/AhmedAbuelaish/spawn-react-redux/blob/master/images/1%200%20100%200%20-60%2090.PNG?raw=true)
![alt text](https://github.com/AhmedAbuelaish/spawn-react-redux/blob/master/images/1%200%20100%200%20-60%2090%20(1).PNG?raw=true)
![alt text](https://github.com/AhmedAbuelaish/spawn-react-redux/blob/master/images/1%2033%20100%200%20-30%2090.PNG?raw=true)



