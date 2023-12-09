"use client"
import {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardBody, Chip} from "@nextui-org/react";
import {BarChart, DonutChart, Title} from "@tremor/react";


export default function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [incidents, setIncidents] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/api/groups")
            .then(res => setGroups(res.data)).catch(err => console.log(err.message));
        axios.get("http://localhost:3000/api/incidents")
            .then(res => setIncidents(res.data));
    }, []);
    let mirrors = groups.flatMap(group => group.locations);
    let allIncidents = incidents.flatMap(incident => incident.posts);


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const incidentCount2023 = allIncidents.reduce((acc, post) => {
        const discoveredDate = new Date(post.discovered);
        const year = discoveredDate.getFullYear();
        const monthIndex = discoveredDate.getMonth();
        const monthName = monthNames[monthIndex];

        if (year === 2023) {
            const yearMonth = `${monthName}`; // Format: MonthName Year
            acc[yearMonth] = (acc[yearMonth] || 0) + 1;
        }

        return acc;
    }, {});

    let incidentArray = Object.entries(incidentCount2023).map(([yearMonth, count]) => ({
        month: yearMonth,
        incidents: count
    }));

// Sort the array from January to December
    incidentArray.sort((a, b) => {
        const monthA = monthNames.indexOf(a.month.split(' ')[0]);
        const monthB = monthNames.indexOf(b.month.split(' ')[0]);
        return monthA - monthB;
    });



    const postCountByGroup2023 = incidents.reduce((acc, group) => {
        // Filter posts in 2023
        const postsIn2023 = group.posts.filter(post => {
            const year = new Date(post.discovered).getFullYear();
            return year === 2023;
        });

        // Update the count for the group
        const groupName = group.group; // Assuming 'group.group' is the group name
        acc[groupName] = (acc[groupName] || 0) + postsIn2023.length;

        return acc;
    }, {});

    const top5ActiveGroups2023 = Object.entries(postCountByGroup2023)
        .map(([group, count]) => ({ group, count }))
        .sort((a, b) => b.count - a.count) // Sort by count in descending order
        .slice(0, 5); // Get the top 5

    console.log(top5ActiveGroups2023);

    return (
        <div className={"p-4"}>
          <div className={"flex justify-end"}>
              <Card className={"w-96 p-2"}>
                  <CardBody className={"flex flex-col gap-2"}>
                      <div className={"flex justify-between"}>
                          <div> Tracked Ransomware Groups:</div>
                          <Chip color={"primary"}> {groups.length}</Chip>
                      </div>

                      <div className={"flex justify-between"}>
                          <div>Total Mirrors: </div>
                          <Chip color={"primary"}>{mirrors.length}</Chip>
                      </div>
                      <div className={"flex justify-between"}>
                          <div>Online Mirrors: </div>
                          <Chip color={"primary"}>{mirrors.filter(el => el.available).length}</Chip>
                      </div>
                      <div className={"flex justify-between"}>
                          <div>Custom Parsers:</div>
                          <Chip color={"primary"}>{86}</Chip>
                      </div>
                  </CardBody>
              </Card>
          </div>
            <div className={"flex gap-8 m-8 justify-center"}>
                <Card className={"w-5/12 p-4"}>
                    <Title>Number of Ransomware Incidents Per Month (2023)</Title>
                    <BarChart
                        className="mt-6"
                        data={incidentArray}
                        index="month"
                        categories={["incidents"]}
                        colors={["blue"]}
                        showAnimation={true}
                    />
                </Card>

                <Card className={"w-5/12 p-4"}>
                    <Title>Most Active Ransomware Gangs(2023)</Title>
                    <DonutChart
                        className="mt-20"
                        data={top5ActiveGroups2023}
                        category="count"
                        index="group"
                        colors={["rose", "yellow", "orange", "indigo", "blue", "emerald"]}
                        showAnimation={true}
                    />
                </Card>
            </div>
        </div>
    );
}