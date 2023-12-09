"use client"
import {useEffect, useState} from "react";
import Incident from "@/app/_components/Inicdent"
import axios from "axios";

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    useEffect(() => {axios.get("http://localhost:3000/api/incidents")
        .then(res => setIncidents(res.data));
    }, []);

    const allPosts = incidents.flatMap(group => group.posts.map(post => ({
        ...post,
        group: group.group.toUpperCase(),
        discovered: new Date(post.discovered).toISOString().split('T')[0]
    })));

// Sort by 'discovered' in descending order
    allPosts.sort((a, b) => new Date(b.discovered) - new Date(a.discovered));

// Get the first 100 posts
    const top100RecentPosts = allPosts.slice(0, 100);

    return(
        <div className={"p-8"}>
            <Incident incidents={top100RecentPosts}/>
        </div>
    );
}