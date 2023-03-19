import { StyleSheet, Text, View,SafeAreaView ,TextInput,Image,TouchableOpacity} from 'react-native'
import React,{useState} from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const HomeTab = () => {
    const [pickerMode, setPickerMode] = useState(null);
    const [inline, setInline] = useState(false);
    const [location, setLocation]= useState('');
    

    
      const showDateTimePicker = () => {
        setPickerMode("datetime");
      };
    
      const hidePicker = () => {
        setPickerMode(null);
      };
    
      const handleConfirm = (date,time) => {
        hidePicker();
        console.warn("A date has been picked: ", date);
        console.warn("A time has been picked: ", time);
      };


  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={require("../assets/bus.png")} />
      
      <View style={styles.inputcontainer}>
        <View style={styles.InputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Location"
              placeholderTextColor="#003f5c"
              onChangeText={(location) => setLocation(location)}
            /> 
        </View>

        <View style={styles.datePicker}>
            <TouchableOpacity  onPress={showDateTimePicker}style={styles.pickDateButton}>
                <Text style={styles.pickDateText}>Select Date and Time</Text>
            </TouchableOpacity>
           
            {Platform.OS === "ios" && (
            <View style={styles.inlineSwitchContainer}>
                <Text style={styles.inlineSwitchText}>Display inline?</Text>
               <Switch value={inline} onValueChange={setInline} />
            </View>
            )}
            <DateTimePickerModal
            isVisible={pickerMode !== null}
            mode={pickerMode}
            onConfirm={handleConfirm}
            onCancel={hidePicker}
            display={inline ? "inline" : undefined}
            />
        </View>

        <TouchableOpacity style={styles.SearchBtn}>
            <Text style={styles.SearchBtnText}>Search</Text>
        </TouchableOpacity>
     </View>
      
      
    </SafeAreaView>
  )
}

export default HomeTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
       },
    
    image: {
        marginBottom: 2,
        height:"40%",
        width:"80%",
    
    },   

    inputcontainer:{
        width:"90%",
        alignItems:"center",
        backgroundColor:"#ECF0F1",
        borderRadius:20,
    },
    InputView:{
        backgroundColor: "#ECF0F1",
        borderBottomStyle:'solid',
        borderBottomWidth:1,
        //borderRadius: 30,
        width: "70%",
        height: 45,
        //marginTop: 10,
        //marginLeft:"15%",
        alignItems: "center",
    },
    TextInput:{
        height: 60,
        flex: 1,
        padding: 10,
        //marginLeft: 20,
        width:"80%",
        alignItems: "center",
        fontSize:20,
      },
      datePicker:{
        width:"50%",
        marginTop:20,
        marginBottom:10,
        //flex:1,

      },
      pickDateButton: {
        width: "100%",
        borderRadius: 1,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#FCF3CF",
      },
      pickDateText:{
        fontWeight:'bold',
      }, 
      SearchBtn: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom:10,
        backgroundColor: "#E6C700",
      },
      SearchBtnText:{
        fontWeight:'bold',
        fontSize:20,
      },
      
});