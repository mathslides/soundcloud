import songs from "../../data/songs"
import Section from "../Section"

function Home() {

	return (
		<div className="grid gap-y-8">
			<Section
				title="Recently played"
				more="/blabla"
				items={songs}
			/>
			<Section
				title="Shows to try"
				more="/blabla"
				items={songs}
			/>
			<Section
				title="Made For Tayfun Erbilen"
				more="/blabla"
				items={songs}
			/>
		</div>
	)
}

export default Home
