"use client"
import Group from "@/app/_components/Group";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Groups() {
    const [groups, setGroups] = useState([]);
    useEffect(() => {axios.get("http://localhost:3000/api/groups")
        .then(res => setGroups(res.data));
    }, []);

    let groupEl = groups.map(group => <Group key={group._id} group={group}/>)
    return (
        <div className={"flex flex-col gap-4 p-8"}>
            {groupEl}
        </div>
    );
}