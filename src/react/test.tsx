import moment from "moment";
import React from "react";

function Mom() {
	const value = new Date().getTime();
	const mo = moment(value).format("yyyy-MM-DD_HH:mm:ss");
	return <>{mo}</>;
}

export { Mom };
