import React, { useState, useEffect } from "react"; 
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View, 
    Button, 
} from "react-native"; 
import DateTimePickerModal from "react-native-modal-datetime-picker"; 
  
const App = () => { 
    const [isDatePickerVisible, setDatePickerVisible] = 
        useState(false); 
    const [expiryDate, setExpiryDate] = useState( 
        new Date() 
    ); // Default to current date and time 
    const [timeUnits, setTimeUnits] = useState({ 
        years: 0, 
        days: 0, 
        hours: 0, 
        minutes: 0, 
        seconds: 0, 
    }); 
  
    useEffect(() => { 
        const calculateTimeUnits = (timeDifference) => { 
            const seconds = Math.floor( 
                timeDifference / 1000 
            ); 
            setTimeUnits({ 
                years: Math.floor( 
                    seconds / (365 * 24 * 60 * 60) 
                ), 
                days: Math.floor( 
                    (seconds % (365 * 24 * 60 * 60)) / 
                        (24 * 60 * 60) 
                ), 
                hours: Math.floor( 
                    (seconds % (24 * 60 * 60)) / (60 * 60) 
                ), 
                minutes: Math.floor( 
                    (seconds % (60 * 60)) / 60 
                ), 
                seconds: seconds % 60, 
            }); 
        }; 
  
        const updateCountdown = () => { 
            const currentDate = new Date().getTime(); 
            const expiryTime = expiryDate.getTime(); 
            const timeDifference = expiryTime - currentDate; 
  
            if (timeDifference <= 0) { 
               
                calculateTimeUnits(0); 
            } else { 
                calculateTimeUnits(timeDifference); 
            } 
        }; 
  
        updateCountdown(); 
        const interval = setInterval(updateCountdown, 1000); 
  
        return () => clearInterval(interval); 
    }, [expiryDate]); 
  
    const formatTime = (time) => { 
        return time.toString().padStart(2, "0"); 
    }; 
  
    const handleStartTimer = () => { 
        setDatePickerVisible(true); 
    }; 
  
    const handleResetTimer = () => { 
        setExpiryDate(new Date()); 
    }; 
  
    const handleDateConfirm = (date) => { 
        setExpiryDate(date); 
        setDatePickerVisible(false); 
    }; 
  
    const handleDateCancel = () => { 
        setDatePickerVisible(false); 
    }; 
  
    return ( 
        <SafeAreaView style={styles.container}> 
            <View style={styles.container}> 
                <Text style={styles.title}> 
                   Timer
                </Text> 
                <Text style={styles.subtitle}> 
                    React Native Countdown Timer 
                </Text> 
                <View style={styles.timer}> 
                    <Text 
                        style={[ 
                            styles.timeUnit, 
                            styles.yearUnit, 
                        ]} 
                    > 
                        {formatTime(timeUnits.years)} 
                    </Text> 
                    <Text 
                        style={styles.timeSeparator} 
                    ></Text> 
                    <Text 
                        style={[ 
                            styles.timeUnit, 
                            styles.dayUnit, 
                        ]} 
                    > 
                        {formatTime(timeUnits.days)} 
                    </Text> 
                    <Text 
                        style={styles.timeSeparator} 
                    ></Text> 
                    <Text 
                        style={[ 
                            styles.timeUnit, 
                            styles.hourUnit, 
                        ]} 
                    > 
                        {formatTime(timeUnits.hours)} 
                    </Text> 
                    <Text 
                        style={styles.timeSeparator} 
                    ></Text> 
                    <Text 
                        style={[ 
                            styles.timeUnit, 
                            styles.minuteUnit, 
                        ]} 
                    > 
                        {formatTime(timeUnits.minutes)} 
                    </Text> 
                    <Text 
                        style={styles.timeSeparator} 
                    ></Text> 
                    <Text 
                        style={[ 
                            styles.timeUnit, 
                            styles.secondUnit, 
                        ]} 
                    > 
                        {formatTime(timeUnits.seconds)} 
                    </Text> 
                    <Text 
                        style={styles.timeSeparator} 
                    ></Text> 
                </View> 
                <Text style={styles.timetitle}> 
                    Years Days Hours Minutes Seconds 
                </Text> 
                <View style={styles.buttonContainer}> 
                    <Button 
                        title="Start Timer"
                        onPress={handleStartTimer} 
                        style={styles.button} 
                    /> 
                    <Button 
                        title="Reset Timer"
                        onPress={handleResetTimer} 
                        style={[ 
                            styles.button, 
                            styles.resetButton, 
                        ]} 
                    /> 
                </View> 
  
                <DateTimePickerModal 
                    isVisible={isDatePickerVisible} 
                    mode="datetime"
                    onConfirm={handleDateConfirm} 
                    onCancel={handleDateCancel} 
                /> 
            </View> 
        </SafeAreaView> 
    ); 
}; 
  
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        padding: 20, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#f0f0f0", 
    }, 
    title: { 
        fontSize: 30, 
        fontWeight: "bold", 
        paddingVertical: 20, 
        color: "green", 
    }, 
    subtitle: { 
        marginBottom: 20, 
        fontSize: 18, 
    }, 
    timer: { 
        flexDirection: "row", 
        alignItems: "center", 
    }, 
    timeUnit: { 
        fontSize: 24, 
        fontWeight: "bold", 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
    }, 
    yearUnit: { 
        backgroundColor: "red", 
        borderRadius: 15, 
        color: "white", 
    }, 
    dayUnit: { 
        backgroundColor: "#3498db", 
        borderRadius: 15, 
        color: "white", 
    }, 
    hourUnit: { 
        backgroundColor: "#27ae60", 
        borderRadius: 15, 
        color: "white", 
    }, 
    minuteUnit: { 
        backgroundColor: "#f39c12", 
        borderRadius: 15, 
        color: "white", 
    }, 
    secondUnit: { 
        backgroundColor: "#9b59b6", 
        borderRadius: 15, 
        color: "white", 
    }, 
    timeSeparator: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginHorizontal: 5, 
    }, 
    timetitle: { 
        fontSize: 17, 
        padding: 10, 
        paddingRight: 19, 
        fontWeight: "bold", 
    }, 
}); 
  
export default App;