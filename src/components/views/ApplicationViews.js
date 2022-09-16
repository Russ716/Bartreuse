import { Outlet, Route, Routes } from "react-router-dom"
import { NewBottleForm } from "../audit/bottleForm"
import { BottleList } from "../audit/bottleList"
import { InventoryAudit } from "../audit/inventoryAudit"

export const ApplicationViews = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={
					<>
						<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css"></link>
						<h1>Bartreuse</h1>
						<div>Chartreuse, the only liqueur so good they named a color after it.</div>
						<main id="container"></main>
						<Outlet />
					</>
				}>
					<Route path="auditButtons" element={ <></>} />
					<Route path="NewBottleForm" element={<NewBottleForm />} />
					<Route path="BottleList" element={<BottleList />} />
					<Route path="bottleOrder" element={<bottleOrder />} />
					<Route path="InventoryAudit" element={<InventoryAudit />} />

				</Route>
			</Routes>
		</>
	)
}


