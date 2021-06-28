import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        background: "#ff7b7b"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    cardBody: {
        width: "200px",
        marginBottom: "4%",
        paddingLeft: "44.5%"
    },
    pageNumber: {
        width: "100%",
        listStyle: "none",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
    },
    pageButton: {
        padding: "10px",
        margin: "8px",
        borderRadius: "5px",
        border: "1px solid #000",
        background: "#000",
        color: "#fff",
        cursor: "pointer",
        listStyle: "none",
        width: "auto",
        height: "20px"
    }
});



function User() {

    const [userData, setUserData] = useState({});
    const [finalUserData, setFinalUserData] = useState({});
    const [userCount, setUserCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const cardPerPage = 4;

    const classes = useStyles();

    // Storing the data from google doc directly to the variable
    // const data = [
    //     {
    //         "id": 1,
    //         "name": "John Doe",
    //         "age": 30,
    //         "skills": [
    //             "JS",
    //             "HTML",
    //             "CSS"
    //         ]
    //     },
    //     {
    //         "id": 2,
    //         "name": "Mr. Bean",
    //         "age": 28,
    //         "skills": [
    //             "React",
    //             "HTML",
    //             "CSS",
    //             "REDUX"
    //         ]
    //     },
    //     {
    //         "id": 3,
    //         "name": "Jane Doe",
    //         "age": 28,
    //         "skills": [
    //             "Node",
    //             "Java",
    //             "Ruby"
    //         ]
    //     },
    //     {
    //         "id": 4,
    //         "name": "Mr. Obama",
    //         "age": 50
    //     },
    //     {
    //         "id": 5,
    //         "name": "Mrs. Kobe Bryan",
    //         "age": 30,
    //         "skills": [
    //             "JS",
    //             "HTML",
    //             "CSS",
    //             "Node",
    //             "Java",
    //             "Ruby",
    //             "React",
    //             "HTML",
    //             "CSS",
    //             "REDUX"
    //         ]
    //     }
    // ];

    useEffect(() => {
        // Created a API which returns the exact response body from the google doc task
        axios.get('https://mocki.io/v1/129ffbb6-6edb-4ab2-b7d4-d12c88004066')
            .then(res => {
                setUserData(res.data.data);
                setUserCount(res.data.count);
            })
            .catch(err => {
                console.log(err);
            });

        // Directly set the data without using axios
        // setUserData(data);

    }, []);

    useEffect(() => {
        let testData = userData;
        // Checking duplicate value for Skills
        for (let i = 0; i < testData.length; i++) {
            let uniqueSkill = [];
            let alreadySeen = Object.create(null);
            if (testData[i].skills) {
                let skillArray = testData[i].skills;
                skillArray.forEach((str) => {
                    if (alreadySeen[str]) {
                    }
                    else {
                        alreadySeen[str] = true;
                        uniqueSkill.push(str);
                    }
                });
            }
            testData[i].skills = uniqueSkill;
        }
        setFinalUserData(testData);
    }, [userData])

    let dataForPage = finalUserData;

    const LastCard = currentPage * cardPerPage;
    const FirstCard = LastCard - cardPerPage;
    let currentCards = [];
    if (userCount > 0) {
        currentCards = dataForPage.slice(FirstCard, LastCard);
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataForPage.length / cardPerPage); i++) {
        pageNumbers.push(i);
    }

    const pageNumberSet = () => {
        setCurrentPage(window.event.target.id);
    }

    return (
        <>
            {userCount > 0 ? currentCards.map((user, idx) => (
                <div key={idx} className={classes.cardBody}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                ID {user.id}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {user.name}
                            </Typography>
                            <Typography className={classes.pos}>
                                Age {user.age}
                            </Typography>
                            {user.skills ?
                                user.skills.map((skill, index) => (
                                    <Typography key={index} variant="body2" component="p">

                                        {(skill === 'HTML' || skill === 'CSS' || skill === 'REDUX') ?
                                            <span style={{ color: "#141EB0" }}>{skill}</span>
                                            : <span style={{ color: "#EEE" }}>{skill}</span>}
                                    </Typography>
                                )) : "No skills to show"}
                        </CardContent>
                    </Card>
                </div>
            )) : null}

            <div>
                <ul className={classes.pageNumber}>
                    {pageNumbers.map((number) => (
                        <li
                            className={classes.pageButton}
                            key={number}
                            id={number}
                            onClick={pageNumberSet}
                        >
                            {number}
                        </li>
                    ))}
                </ul>

                <h4 style={{ paddingLeft: "49%" }}>Items count {currentCards.length} / {dataForPage.length}</h4>
            </div>
        </>
    )
}

export default User
