# Spawn [![Build Status](https://travis-ci.com/AhmedAbuelaish/spawn-react-redux.svg?branch=master)](https://travis-ci.com/AhmedAbuelaish/spawn-react-redux)
The main driver for this project was to generate a large amount of data to test the limits of the browser and along the way create something that resembles art.

## Requirements

1. Use the least amount of libraries as possible to keep all the code exposed and be able to optimize it.

2. Use DOM elements unless rendering limits performance then switch to canvas

### Dependencies

**App development**

-[create-react-app](https://www.npmjs.com/package/create-react-app)

-[react-redux](https://www.npmjs.com/package/react-redux)

**Components**

-[react-minimal-pie-chart](https://www.npmjs.com/package/react-minimal-pie-chart)

### Results

-The main performance limitation was the logic/javascript, which can be imporved by setting an upper limit/time limit on the size of the array created

-Using a webworker may work but what limited the performance of the webworker was react-redux's buffering of setState

### Bonus
![alt text](https://github.com/AhmedAbuelaish/spawn-react-redux/blob/master/images/Capture.PNG?raw=true)
![alt text](https://github.com/AhmedAbuelaish/spawn-react-redux/blob/master/images/Capture2.PNG?raw=true)
![alt text](https://github.com/AhmedAbuelaish/spawn-react-redux/blob/master/images/1%200%20100%200%20-60%2090.PNG?raw=true)
![alt text](https://github.com/AhmedAbuelaish/spawn-react-redux/blob/master/images/1%200%20100%200%20-60%2090%20(1).PNG?raw=true)
![alt text](https://github.com/AhmedAbuelaish/spawn-react-redux/blob/master/images/1%200%20100%200%20-60%2090.PNG?raw=true)
![alt text](https://github.com/AhmedAbuelaish/spawn-react-redux/blob/master/images/1%2033%20100%200%20-30%2090.PNG?raw=true)



