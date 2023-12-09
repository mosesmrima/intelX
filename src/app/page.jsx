"use client"
import {Card, CardBody, CardHeader, Button} from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={"flex items-center gap-4"}>
        <div>
          <h1>IntelX</h1>
          <h2>One stop pane for all your ransomware threat intelligence needs.</h2>
        </div>
        <Button size={"lg"} color={"primary"}>Request Demo</Button>
      </div>
      <h1>Features</h1>
      <div className={"flex gap-6"}>
        <Card className={"p-4"}>
          <CardHeader>Monitor ransomware activities on the dark web</CardHeader>
          <CardBody>
            <li>
              Stay one step ahead of cyber threats by leveraging IntelX's dark web monitoring feature.
            </li>
            <li>
              Receive real-time updates on ransomware activities, including new incidents and emerging trends.
            </li>
            <li>
              Gain a unique perspective into the tactics and strategies employed by ransomware operators in the hidden realms of the internet.
            </li>
          </CardBody>
        </Card>
        <Card className={"p-4"}>
          <CardHeader>View a complete profile of ransomware gangs</CardHeader>
          <CardBody>
            <li>
              Access comprehensive profiles detailing the history, techniques, and affiliations of each ransomware group.
            </li>
            <li>
              Enhance your threat intelligence with in-depth insights into the motivations and behaviors of specific ransomware actors.
            </li>
          </CardBody>
        </Card>
        <Card className={"p-4"}>
          <CardHeader>Integrate with your existing solutions</CardHeader>
          <CardBody>
            <li> Elevate your cybersecurity ecosystem by effortlessly integrating IntelX with your current infrastructure.</li>
            <li> Leverage our robust API to seamlessly connect IntelX with a variety of security solutions. </li>
            <li> STIX/TAXII compatibility, enabling standardized sharing of threat intelligence across different platforms.</li>
          </CardBody>
        </Card>
      </div>
    </main>
  )
}
