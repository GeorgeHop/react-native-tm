# react-native-toast
Customizable toast component for react-native applications. Supported on ios and android.


# Installation
expo: `expo install react-native-tm`  
npm: `npm i react-native-tm`  
yarn: `yarn add react-native-tm`

## Basic usage
```JS
import Toast from "react-native-tm";

export default function YourComponent() {
   
   return(
      <YourComponentsHere></YourComponentsHere>
      <Toast
        show={true}
        withClose={true}
        style={{
          toast: {
            width: '100%',
            height: 50,
            backgroundColor: 'red'
          }
        }}
      />
   )
}

// more about customizing below
```

### How customize your toast ? 
```JS
import Toast from "react-native-tm";

export default function YourComponent() {
   
   return(
      <YourComponentsHere></YourComponentsHere>
      <Toast
        show={true}
        // set the animation type of toast choose the best for you in props
        animationType={'bounce'}
        // add the closing toast function on press
        withClose={true}
        // pass toast styles object to style
        style={{
          toast: {
            width: '100%',
            height: 50,
            backgroundColor: 'red'
          }
        }}
      >
        // and for sure you can add childrens here
        // to customize your toast 
        <View style={{height: 50, width: 50, backgroundColor: 'black', borderRadius: 30}}/>
        <View
          style={{
              marginLeft: 10
          }}
        >
            <Text>
                  Title top
            </Text>
            <Text>
                  Description on the bottom
            </Text>
        </View>
      </Toast>
   )
}

```

## Props
Below are the props you can pass to the React Component.

| Prop  | Type | Default | Example | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| show  | boolean | | show={true} | Put the toast state |
| animationType | string | | animationType={'bounce'} | If you what different animations on your toast |
| toastOnPress | function | | toastOnPress={() => console.log('check')} | You can add many other functions here or just navigate to other screen |
| withClose | boolean | false | withClose={true} | Added posibility to close toast on press. You can use it with toastOnPress at one time. |
| children | component | | ``` <Toast><YourComponent/></Toast> ``` | You can add yout own component for example messages from users in your app or internet connection notifications. |
| style | object | | {toast: {backgroundColor: 'black', height: 50}} | The styles object for styling the toast details. More about styling in Custom styling step.|
| showingDuration | int | 8000 | showingDuration={3000} | How much time toast will show on the screen |
| statusBarHeight | int | 180 | statusBarHeight={150} | If you have a specific status bar on your device you may want to pass this props to aware some UI bugs on the device |
