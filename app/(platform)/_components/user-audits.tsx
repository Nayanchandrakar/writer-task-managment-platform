"use client";
import { ActivitySquare } from "lucide-react";
import Label from "../workspace/[workSpaceId]/notes/_components/Label";
import MapAudits from "./map-audits";

const UserAudits = () => {
  return (
    <div className=" mt-16 ">
      <Label LabelIcon={ActivitySquare} name={"Your activity"} isPro={true} />
      <MapAudits />
    </div>
  );
};

export default UserAudits;
