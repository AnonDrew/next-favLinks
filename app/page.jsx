// Components are functions that return some JSX

// JSX is a javascript syntax in React to create our HTML elements

"use client";

import { useState, useEffect } from "react" // we use this to add state to our components
// state lets us keep track of changing data and show it in the component

import Form from "./components/Form"
import Table from "./components/Table"

function HomePage() {
    const [favLinks, setFavLinks] = useState([])

    async function getData() {
        let url = "https://localhost:8000/favlinks"

        let response = await fetch(url)
        let data = await response.json()

        setFavLinks(data)
    }

    useEffect(() => {
        getData()
    }, [])

    // async function examplePost() {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     const raw = JSON.stringify({
    //         "name": name,
    //         "URL": URL
    //     });

    //     const requestOptions = {
    //         method: "POST",
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: "follow"
    //     };

    //     let response = await fetch("localhost:8000/favLink", requestOptions)
    // }

    getData()
    
    function handleNewFavLink(favLink){
        // favlink is an object containing a {name, URL}

        for (const link of favLinks) {
            if (favLink.name == link.name) return
        }

        console.log(favLink, "in HomePage")

        let newFavLinks = [...favLinks, favLink]

        setFavLinks(newFavLinks)
    }
    

    return (
        <div>
            <h1> FavLinks </h1>
       
       {/* The Form is responsible for gathering the data
        and alerting the HomePage when it needs to pass it to the table  */}
           
            <Form submitFavLink={handleNewFavLink} /> 

            
            
            <Table data={favLinks} dataMutate={setFavLinks}/>
            


        </div>
    )
}
export default HomePage