<script>
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import axios from 'axios';

	import products from './products.js';
	import html2canvas from 'html2canvas';
	import Image from '../routes/components/image.svelte';

	import NotoSansKR_Bold from '../font/NotoSansKR-Bold.otf';
	// html2canvas cdn import
	// import BILGE1 from '../../../bilge1.svelte';
	// import BILGE2 from './bilge2.svelte';
	// import BILGE3 from './bilge3.svelte';
	// import BILGE4 from './bilge4.svelte';

	import weather from '../image/bilge_weather.png';
	import bilge1_1 from '../image/bilge1_1.png';
	import bilge2_1 from '../image/bilge2_1.png';
	import bilge3_1 from '../image/bilge3_1.png';
	import bilge4_1 from '../image/bilge4_1.png';
	import bilge_1 from '../image/bilge_1.png';
	import sign from '../image/sign.png';

	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
	const date = new Date().getDate();
	const today = `${year}.${month}.${date}`;

	let sum = 0;

	let prds = products.products;
	let foods = [];
	let goodss = [];
	let sales = [];
	let selected_products = [];

	//DB API URL
	const url =
		'https://xst9vb4d8k.execute-api.us-west-2.amazonaws.com/popup_store_api_stage/popup_store_resource';

	//합계 금액
	$: sum = selected_products.reduce(
		(accumulator, current) => accumulator + current['count'] * current['price'],
		0
	);
	const product_map = new Map();
	let product_set;

	prds.forEach((e) => {
		if (e['cate'] === 'food') {
			foods.push(e);
		} else if (e['cate'] === 'sale') {
			sales.push(e);
		} else {
			goodss.push(e);
		}
	});

	for (let prd of prds) {
		product_map.set(prd['id'], prd);
	}

	function addPrd(goods) {
		let id = goods['id'];
		let product_obj = product_map.get(id);
		product_obj['count'] += 1;
		product_map.set(id, product_obj);

		selected_products.push(goods);
		product_set = new Set(selected_products);
		selected_products = [...product_set];
	}

	function upCount(product) {
		let id = product['id'];
		let product_obj = product_map.get(id);
		product_obj['count'] += 1;
		product_map.set(id, product_obj);
		selected_products = selected_products; //리렌더링 용도, 영수증 영역 each 문에서 얘를 참조하고 있는데 참조 변수에 접근을 해야 리렌더가 되는것 같다.
	}
	function downCount(product) {
		let id = product['id'];
		let product_obj = product_map.get(id);
		let count = product_obj['count'];
		if (count >= 2) {
			count -= 1;
		}
		product_obj['count'] = count;
		product_map.set(id, product_obj);
		selected_products = selected_products; //리렌더링 용도
	}
	function removeProduct(product) {
		let id = product['id'];
		let idx = selected_products.findIndex((element) => element['id'] === id);
		selected_products.splice(idx, 1);
		selected_products = selected_products;
	}
	function reset() {
		location.reload();
	}
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
	}
	// 하나, 둘, 셋 김치~
	function takeShot() {
		let bilges = document.querySelectorAll('div.bilge');
		const num = getRandomInt(4, 0);

		let data = html2canvas(bilges[num], {
			scale: 2
		}).then((canvas) => {
			return canvas.toDataURL('image/png', 1.0);
		});
		return data;
	}
	async function makeWindow() {
		let data = await takeShot();
		let printWindow = window.open('', 'Print Window', 'height=400, width=600');
		printWindow.document.write('<html><head><title>Print Window</title>');
		printWindow.document.write("</head><body ><img src='");
		printWindow.document.write(data);
		printWindow.document.write("' /></body></html>");
		printWindow.document.close();
		return printWindow;
	}
	//$$ promise result 어케 가져오지
	//
	async function doPrint() {
		if (selected_products.length <= 0) {
			alert('상품을 담아주세요!!');
			return;
		}

		let win;
		win = await makeWindow().then((window) => {
			return window;
		});
		win.print();
		win.close();
		location.reload();
	}

	async function doPrintWithAPI() {
		if (selected_products.length <= 0) {
			alert('상품을 담아주세요!!');
			return;
		}

		let win;
		win = await makeWindow().then((window) => {
			return window;
		});
		win.print();
		win.close();

		//db에 구매 정보 보내기

		// let body = [];
		// selected_products.forEach((e) => {
		// 	let obj = {
		// 		name: e.name,
		// 		count: e.count,
		// 		price: e.price
		// 	};
		// 	body.push(JSON.stringify(obj));
		// });

		// await fetch(url, {
		// 	method: 'post',
		// 	body: {
		// 		selected_products: JSON.stringify(selected_products)
		// 	},
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	}
		// }).then((res) => {
		// 	console.log('res', res);
		// });

		try {
			const res = await axios.post(url, { selected_products: JSON.stringify(selected_products) });
			console.log(JSON.stringify(selected_products));
			console.log('res', res.data);
		} catch (e) {
			console.log('errorrrrrrr', e);
		}

		//location.reload();
	}
</script>

<!------------------------------------------------------------------------------------------------------------------->

<div style="display: flex;">
	<div>
		<!-- 관리자 영역 ---------------------------------------------------------------->
		<div class="area1">
			<Tabs class="tabs">
				<TabList>
					<Tab>식품</Tab>
					<Tab>굿즈</Tab>
					<Tab>세일</Tab>
				</TabList>
				<TabPanel>
					<div class="wrapper">
						{#each foods as food}
							{#if food['click'] === true}
								<div on:click={() => addPrd(food)} class="prd {food['color']}">
									<p>
										{food['name']}<br /> <span style="font-size: small;">{food['flavorName']}</span>
									</p>
								</div>
							{:else}
								<div class="prd {food['color']}">
									<p>
										{food['name']}<br /> <span style="font-size: small;">{food['flavorName']}</span>
									</p>
								</div>
							{/if}
						{/each}
					</div>
				</TabPanel>
				<TabPanel>
					<div class="wrapper">
						{#each goodss as goods}
							{#if goods['click'] === true}
								<div on:click={() => addPrd(goods)} class="prd">
									<p>{goods['name']} {goods['flavorName']}</p>
								</div>
							{:else}
								<div class="prd">
									<p>{goods['name']} {goods['flavorName']}</p>
								</div>
							{/if}
						{/each}
					</div>
				</TabPanel>
				<TabPanel>
					<div class="wrapper">
						{#each sales as sale}
							{#if sale['click'] === true}
								<div on:click={() => addPrd(sale)} class="prd">
									<p>{sale['name']} {sale['flavorName']}</p>
								</div>
							{:else}
								<div class="prd">
									<p>{sale['name']} {sale['flavorName']}</p>
								</div>
							{/if}
						{/each}
					</div>
				</TabPanel>
			</Tabs>
		</div>
		<!----------------------------------------------------------------------------->

		<!-- 미리보기 영역 ---------------------------------------------------------------->

		<div class="area2">
			<div>
				<h1>미리보기</h1>
				<div>
					{#if selected_products !== undefined}
						{#each selected_products as product}
							<div class="btnarea">
								{product['name']}
								{product['flavorName']}
								{product['count']}
								<div>
									<button on:click={() => upCount(product)}>+</button><button
										on:click={() => downCount(product)}>-</button
									><button on:click={() => removeProduct(product)}>X</button>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>

		<div class="button_wrap">
			<button style="font-size:x-large;" on:click={reset}>리셋</button>
			<button style="font-size:x-large;" on:click={doPrintWithAPI}>프린트</button>
			<button style="font-size:x-large;" on:click={doPrint}>테스트 프린트</button>
		</div>

		<div style="font-weight: bold;">
			<br /><br /><br /><br />노트북 화면 터치 가능합니다!<br /><br />
		</div>
		<div><img src={sign} alt="sign" /></div>
		<!-- 미리보기 영역 ---------------------------------------------------------------->
	</div>

	<!-- 영수증2 ------------------------------------------------------------------------------------------------------------------>
	<div class="bilge">
		<div>
			<div class="top">
				<div class="top_header">
					<span>널담의 영수증입니다!</span>
					<div>
						<img src={weather} alt="weather" />
						<p>{today}</p>
					</div>
				</div>
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={bilge1_1} />
				<br />
			</div>
			<div class="mid">
				<hr />
				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>수량</th>
							<th>가격</th>
						</tr>
					</thead>
					<tbody>
						{#each selected_products as product}
							<tr>
								<td>{product['name']} {product['flavorName']}</td>
								<td>{product['count']}</td>
								<td>{(product['count'] * product['price']).toLocaleString('ko-KR')}</td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<td>결제금액</td>
							<td />
							<td>₩{sum.toLocaleString('ko-KR')}</td>
						</tr>
					</tfoot>
				</table>
				<hr />
			</div>
			<div class="bottom">
				<img src={bilge_1} alt="wow" width="100px" />
			</div>
		</div>
		<hr />
	</div>
	<!------------------------------------------------------------------------------------------------------------------>

	<!-- 영수증2 ------------------------------------------------------------------------------------------------------------------>
	<div class="bilge">
		<div>
			<div class="top">
				<div class="top_header">
					<span>널담의 영수증입니다!</span>
					<div>
						<img src={weather} alt="weather" />
						<p>{today}</p>
					</div>
				</div>
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={bilge2_1} />
				<br />
			</div>
			<div class="mid">
				<hr />
				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>수량</th>
							<th>가격</th>
						</tr>
					</thead>
					<tbody>
						{#each selected_products as product}
							<tr>
								<td>{product['name']} {product['flavorName']}</td>
								<td>{product['count']}</td>
								<td>{(product['count'] * product['price']).toLocaleString('ko-KR')}</td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<td>결제금액</td>
							<td />
							<td>₩{sum.toLocaleString('ko-KR')}</td>
						</tr>
					</tfoot>
				</table>
				<hr />
			</div>

			<div class="bottom">
				<img src={bilge_1} alt="wow" width="100px" />
			</div>
		</div>
		<hr />
	</div>
	<!------------------------------------------------------------------------------------------------------------------>

	<!-- 영수증2 ------------------------------------------------------------------------------------------------------------------>
	<div class="bilge">
		<div>
			<div class="top">
				<div class="top_header">
					<span>널담의 영수증입니다!</span>
					<div>
						<img src={weather} alt="weather" />
						<p>{today}</p>
					</div>
				</div>
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={bilge3_1} />
				<br />
			</div>
			<div class="mid">
				<hr />
				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>수량</th>
							<th>가격</th>
						</tr>
					</thead>
					<tbody>
						{#each selected_products as product}
							<tr>
								<td>{product['name']} {product['flavorName']}</td>
								<td>{product['count']}</td>
								<td>{(product['count'] * product['price']).toLocaleString('ko-KR')}</td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<td>결제금액</td>
							<td />
							<td>₩{sum.toLocaleString('ko-KR')}</td>
						</tr>
					</tfoot>
				</table>
				<hr />
			</div>
			<div class="bottom">
				<img src={bilge_1} alt="wow" width="100px" />
			</div>
		</div>
		<hr />
	</div>
	<!------------------------------------------------------------------------------------------------------------------>

	<!-- 영수증2 ------------------------------------------------------------------------------------------------------------------>
	<div class="bilge">
		<div>
			<div class="top">
				<div class="top_header">
					<span>널담의 영수증입니다!</span>
					<div>
						<img src={weather} alt="weather" />
						<p>{today}</p>
					</div>
				</div>
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={bilge4_1} />
				<br />
			</div>
			<div class="mid">
				<hr />
				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>수량</th>
							<th>가격</th>
						</tr>
					</thead>
					<tbody>
						{#each selected_products as product}
							<tr>
								<td>{product['name']} {product['flavorName']}</td>
								<td>{product['count']}</td>
								<td>{(product['count'] * product['price']).toLocaleString('ko-KR')}</td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<td>결제금액</td>
							<td />
							<td>₩{sum.toLocaleString('ko-KR')}</td>
						</tr>
					</tfoot>
				</table>
				<hr />
			</div>
			<div class="bottom">
				<img src={bilge_1} alt="wow" />
			</div>
		</div>
		<hr />
	</div>

	<!------------------------------------------------------------------------------------------------------------------>

	<!-- <BILGE1 today={today} selected_products={selected_products} sum={sum} weather={weather} />
    <BILGE2 today={today} selected_products={selected_products} sum={sum} weather={weather} />
    <BILGE3 today={today} selected_products={selected_products} sum={sum} weather={weather} />
    <BILGE4 today={today} selected_products={selected_products} sum={sum} weather={weather} /> -->
</div>

<style>
	* {
		/*border: 1px solid #0a46d7;*/
		margin: 0;
		padding: 0;
	}

	button {
		width: 5vw;
		height: 5vh;
	}
	.mid {
		padding: 0 7mm;
	}
	td {
		text-align: center;
	}
	tbody td,
	tfoot td {
		border-top: 2px solid black;
	}
	tbody td:nth-child(1) {
		text-align: left;
		word-break: keep-all;
		font-family: 'NotoSansKR_Bold';
	}
	tbody td {
		font-size: 14.5px;
	}

	tfoot td {
		font-weight: bold;
		font-size: 16px;
	}
	thead th {
		font-size: 16px;
		white-space: nowrap;
	}

	.bilge {
		text-align: center;
		min-width: 79mm;
		max-width: 79mm;
	}
	.bilge > hr {
		height: 1px;
		opacity: 0.3;
	}
	.bilge img,
	table {
		width: 100%;
		overflow: hidden;
	}
	.bilge .top_header span:nth-child(1) {
		font-weight: bold;
		font-size: small;
	}
	.top_header {
		padding: 0 7mm;
	}

	.top_header p {
		font-size: 10px;
		text-align: right;
	}
	.bilge .top_header {
		display: flex;
		justify-content: space-between;
	}
	.top_header img {
		height: 5mm;
		width: auto;
	}
	:global(.svelte-tabs) {
		width: 500px;
	}
	:global(.svelte-tabs) > ul > li {
		font-size: xx-large;
	}

	:global(.svelte-tabs div.svelte-tabs__tab-panel) div.wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	:global(.svelte-tabs div.svelte-tabs__tab-panel) div.wrapper div {
		background-color: skyblue;
		color: black;
		font-weight: bold;
		font-size: x-large;
		margin: 3px 3px;
		border-radius: 3px;
		width: 32%;
		word-break: break-all;
	}
	:global(.svelte-tabs__tab) {
		font-size: xx-large;
	}

	.btnarea {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	div.prd p {
		word-break: keep-all;
	}
	div.prd {
		min-height: 80px;
	}
	div.bottom {
		padding-bottom: 2mm;
		margin-top: 3mm;
	}
	thead th:nth-child(1),
	tfoot td:nth-child(1) {
		text-align: left;
	}

	@font-face {
		font-family: 'NotoSansKR_Bold';
		src: local('../font/NotoSansKR-Bold.otf');
	}
	div.btnarea > div {
		min-width: 220px;
	}
	div.top {
		margin-bottom: 5mm;
	}

	:global(.svelte-tabs div.svelte-tabs__tab-panel) div.wrapper div.aqua {
		background-color: aqua;
	}
	:global(.svelte-tabs div.svelte-tabs__tab-panel) div.wrapper div.burlywood {
		background-color: burlywood;
	}
	:global(.svelte-tabs div.svelte-tabs__tab-panel) div.wrapper div.coral {
		background-color: coral;
	}
	:global(.svelte-tabs div.svelte-tabs__tab-panel) div.wrapper div.cornflowerblue {
		background-color: cornflowerblue;
	}
	:global(.svelte-tabs div.svelte-tabs__tab-panel) div.wrapper div.darkgrey {
		background-color: darkgrey;
	}
	.button_wrap {
		display: flex;
		justify-content: space-between;
	}
	.button_wrap button {
		width: 30%;
		height: 80px;
	}
</style>
