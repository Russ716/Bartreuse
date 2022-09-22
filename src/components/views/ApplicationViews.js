import { Outlet, Route, Routes } from "react-router-dom"
import { GenerateOrder } from "../audit/auditButtons"
import { NewBottleForm } from "../audit/bottleForm"
import { BottleList } from "../audit/bottleList"
import { EditBottle } from "../audit/editBottle"
import { InventoryAudit } from "../audit/inventoryAudit"



export const ApplicationViews = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={
					<>
						<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css"></link>

						<div><h1>Bartreuse</h1><h2>Chartreuse: the <i>only</i> liqueur so good they named a color after it.</h2></div>
						<main id="container"></main>
						<Outlet />
					</>
				}>
					<Route path="auditButtons" element={<GenerateOrder />} />
					<Route path="NewBottleForm" element={<NewBottleForm />} />
					<Route path="BottleList" element={<BottleList />} />
					<Route path="bottleOrder" element={<bottleOrder />} />
					<Route path="InventoryAudit" element={<InventoryAudit />} />
					<Route path="editBottle/:bottleId" element={<EditBottle />} />


				</Route>
			</Routes>
		</>
	)
}


