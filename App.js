import React from 'react';
import { FontAwesome } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,Text,
  View, ScrollView,
  Card, CardItem,
  FlatList,Body,
  Right,
} from 'react-native';

let idGenerator = 1;

export default class App extends React.Component {
state = {
  value: "",
  currentStatus:null,
  tasks: [
    { id:415,task: 'task21', status: true },
    { id:4422,task: 'task2', status: false },
    
  ],
}

addTask = () => {
  this.setState({
    
    tasks:[
      { 
        id:idGenerator++,
        task: this.state.value, 
        status: false 
      }
    ,...this.state.tasks], value:""})
}

toggleStatus = (id)=>{ 
  
  let { tasks } = this.state;
  let newTasks = tasks.map((task)=> {
    if(task.id == id) {
      task.status == true ? task.status=false : task.status=true;
    }
    return task
  })
  this.setState({tasks:newTasks})
}

filterTasks=(currentStatus)=>{
  this.setState({currentStatus})
}



renderTasks = ({ item }) =>{
return (
  <View style={styles.taskStyling}>
    <Text style={{ width:200,color:"white", textAlign:"center", textAlignVertical:"center" }}>
        {item.task}
    </Text>
    <View>
        <TouchableOpacity
        onPress={() => {
          this.toggleStatus(item.id)
        
        }}>
        {item.status ? (<Foundation name="checkbox" size={32} color="green" />):
                  (<MaterialCommunityIcons name="checkbox-blank-outline" size={32} color="green" />)
        }
      </TouchableOpacity>
    </View>
  </View>
)
}

render() {
const { currentStatus, tasks } = this.state;
const filteredTasks = currentStatus === null ?
  tasks : tasks.filter(task => currentStatus === "complete" 
  ? task.status: !task.status)


const { value } = this.state;
return (

  <View style={{ flex:1 ,backgroundColor: '#2980b9'}}>
    <View style={styles.container}> 
      <View style={{ flexDirection:"row" }}> 
        <TouchableOpacity style={{ marginRight:15, alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 50 }}
        onPress={() =>
          this.addTask()
        }>
          <FontAwesome name="plus" size={15} />
        </TouchableOpacity>
        <TextInput
          ref={this.ref}
          style={ styles.textInputStyling}
          placeholder="write here"
          value={value}
          onSubmitEditing={() => { this.addTask() }}
          onChangeText={(value) => {
            this.setState({ value });
          }}
        />
      </View>

     
      <View style={{marginVertical:10, flexDirection:"row", width:250 , justifyContent:"space-between" }}>
        <TouchableOpacity style={styles.filterButton}
          onPress={() =>
          this.filterTasks(null)
          }>
          <Text style={{ color:"white" }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}
          onPress={() =>
            this.filterTasks("complete")
          }>
          <Text style={{ color:"white" }}>Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}
          onPress={() =>
            this.filterTasks("unComplete")
          }>
          <Text style={{ color:"white" }}>unComplete</Text>
        </TouchableOpacity>
      </View>

    </View>

    <View style={{  flex:8 }}>
      <ScrollView style={{ backgroundColor: 'lightblue' }}
      contentContainerStyle={{ justifyContent: "center",
      alignItems: "center" }}
      >
      <FlatList
        data={filteredTasks}
        style={{ marginTop:50 }}
        renderItem = { this.renderTasks }
        keyExtractor={item => item.id.toString()}
      />
      </ScrollView>
    </View>

  </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "pink",
    marginTop: 70,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton:{
    padding:5,
    borderRadius:5,
    borderWidth:1,
    borderColor:"grey"
  },
  textInputStyling:{
    width: 280,
    borderColor: "black",
    borderWidth: 1,
    color: "white",
    fontSize: 20,
    borderRadius: 5,
    height: 40,
    textAlign:"center", textAlignVertical:"center",
  },
  taskStyling:{
    width: 250,
    borderColor: "grey",
    borderWidth:1,
    fontSize: 20,
    borderRadius: 1,
    height: 40,
    flexDirection:"row",
    marginVertical:10,
  }
});


