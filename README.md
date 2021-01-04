# OpenRemote Map function renewed 

OpenRemote is an open source platform which provides the user with a dashboard to monitize a variety of components which are mostly sighted towards citys. One of the key functions wihtin the OpenRemote application is its city map. In order to expand the functionalities and improve the design of this map our team has redesigned the map function and created a prototype which contains new functionalities. 

## Table of contents  
1. Usage  
2. Used libraries 
3. Functionalities  
   3.1 Marker states based on data  
   3.2 Filter function  
   3.2 Compare function  
4. Future goals  


## 1. Usage 

This application can be used to monitor city elements based on data. It’s build to give the user an overal view of whats going on in the city, yet give the user the ability to look in to this specific elements using our filter and compare function. 

## 2. Used libraries: 

Mapbox: https://github.com/mapbox/mapbox.js/ 

Chart.js: https://github.com/chartjs 

## 3. Functionalities 

We added several new funtions and elements to the Map view. All the new functions are explained under this paragraph with a visual where you can find this function in the user interface.   

#### 3.1 Marker states based on data 

As seen below, the state of the marker is changed based on the level of the data. There are 4 marker states: 

*afb in kaart 

In this case these marker states relate to the ocupied spaces on a parking lot, going from green (less than 25% of the capacity ocupied) up to red (above 75% capacity ocupied) 

![alt text](https://ibb.co/nmrC18b "Markers")
 

#### 3.2 Filter function 

There is an option to set a range of percentages of which the markers will be shown on the map. This is done with the dual slider we have desigsend and realised in this application.  

 

 

#### 3.3 Compare Function 

Each marker has a pop up attached to it on which the marker can be add to a selection of markers that can be compared in a later screen. 

## 4. Future goals 

 

Add another layer of data which can contain a variety of data types (new markers) 

Direct the compare function to the Openremote assets page 

 

 

 

 

 
