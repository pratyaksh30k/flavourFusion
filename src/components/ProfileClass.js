import React from "react";
class ProfileClass extends React.Component{
    constructor(props){
       super(props);
       this.state={
        count:0,
        info:{
            name:"Dummy name",
            id:"Dummy id",
        }
       }
       
    }
    async componentDidMount(){
        const data = await fetch("https://api.github.com/users/NamanGIT32");
        const json = await data.json();
        console.log(json);
        this.setState({
            info:json,
        })
        console.log("Child-mount"); 
    }
    componentDidUpdate(){
        console.log("child-update");
    }
    componentWillUnmount(){
        console.log("child-unmounted")
    }
    render(){
        return(
            <>
                <span>
                    <button onClick={()=>{
                        this.setState({
                            count:1,
                        })
                    }}>click</button>
                    <div>{this.state.count}</div>
                </span>
                {console.log("Child-rendfer")}
                <h1>This is my first class based component</h1>
                <h1>name: {this.props.name}</h1>
                <h4>name again: {this.state.info.name}</h4>
                <h4>ID: {this.state.info.id} </h4>                
            </>
        )
    }
}
export default ProfileClass;