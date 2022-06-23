const products = [
	{
		id: '1',
		cate: 'food',
		name: '비건 크로와상',
		count: 0,
		flavor: ['플레인'],
		click: true,
		color: 'aqua',
		price: 3500
	},
	{
		id: '2',
		cate: 'food',
		name: '비건 크로와상',
		count: 0,
		flavor: ['코코넛'],
		click: true,
		color: 'aqua',
		price: 3700
	},
	{
		id: '3',
		cate: 'food',
		name: '비건 크로와상',
		count: 0,
		flavor: ['초콜릿'],
		click: true,
		color: 'aqua',
		price: 3900
	},
	{
		id: '4',
		cate: 'food',
		name: '비건 크로플',
		count: 0,
		flavor: ['플레인'],
		click: true,
		color: 'burlywood',
		price: 3900
	},

	{
		id: '7',
		cate: 'food',
		name: '비건 크로플',
		count: 0,
		flavor: ['초콜릿'],
		click: true,
		color: 'burlywood',
		price: 4300
	},
	{
		id: '6',
		cate: 'food',
		name: '',
		count: 0,
		flavor: [''],
		click: false,
		color: 'burlywood',
		price: 0
	},
	{
		id: '8',
		cate: 'food',
		name: '저당 까눌레',
		count: 0,
		flavor: ['플레인', '얼그레이', '초콜릿'],
		click: true,
		color: 'coral',
		price: 2500
	},

	{
		id: '5',
		cate: 'food',
		name: '저당 휘낭시에',
		count: 0,
		flavor: ['플레인'],
		click: true,
		color: 'cornflowerblue',
		price: 2300
	},
	{
		id: '9',
		cate: 'food',
		name: '저당 휘낭시에',
		count: 0,
		flavor: ['코코넛', '황치즈'],
		click: true,
		color: 'cornflowerblue',
		price: 2500
	},

	{
		id: '28',
		cate: 'food',
		name: '견과초코볼',
		flavor: ['아몬드', '캐슈넛'],
		count: 0,
		click: true,
		color: 'darkgrey',
		price: 8900
	},

	{
		id: '29',
		cate: 'food',
		name: '견과초코볼',
		flavor: ['마카다미아'],
		count: 0,
		click: true,
		color: 'darkgrey',
		price: 10900
	},

	{
		id: '10',
		cate: 'goods',
		name: '포스터 a2',
		flavor: [''],
		count: 0,
		click: true,
		color: 'aqua',
		price: 10000
	},
	{
		id: '11',
		cate: 'goods',
		name: '포스터 a3',
		flavor: [''],
		count: 0,
		click: true,
		color: 'aqua',
		price: 8000
	},
	{
		id: '12',
		cate: 'goods',
		name: '키링',
		flavor: [''],
		count: 0,
		click: true,
		color: 'aqua',
		price: 10000
	},
	{
		id: '18',
		cate: 'goods',
		name: '스티커 6개 세트',
		flavor: ['A', 'B'],
		count: 0,
		click: true,
		color: 'aqua',
		price: 5000
	},
	{
		id: '15',
		cate: 'goods',
		name: '스티커',
		flavor: [''],
		count: 0,
		click: true,
		color: 'aqua',
		price: 1000
	},
	{
		id: '13',
		cate: 'goods',
		name: '엽서 6개 세트',
		flavor: [''],
		count: 0,
		click: true,
		color: 'aqua',
		price: 8000
	},
	{
		id: '14',
		cate: 'goods',
		name: '엽서',
		flavor: [''],
		count: 0,
		click: true,
		color: 'aqua',
		price: 1500
	},

	{
		id: '16',
		cate: 'food',
		name: '저당 휘낭시에 세트',
		flavor: [''],
		count: 0,
		click: true,
		color: '',
		price: 12000
	},
	{
		id: '17',
		cate: 'food',
		name: '저당 까눌레 세트',
		flavor: [''],
		count: 0,
		click: true,
		color: '',
		price: 12000
	},

	{
		id: '19',
		cate: 'sale',
		name: '크로와상 3개입',
		flavor: [''],
		count: 0,
		click: true,
		color: 'aqua',
		price: 10000
	},
	{
		id: '20',
		cate: 'sale',
		name: '크로플 3개입',
		flavor: [''],
		count: 0,
		click: true,
		color: 'aqua',
		price: 10000
	},

	{
		id: '21',
		cate: 'sale',
		name: '까눌레 5개입',
		flavor: [''],
		count: 0,
		click: true,
		color: 'aqua',
		price: 10000
	},
	{
		id: '22',
		cate: 'sale',
		name: '휘낭시에 4개입',
		flavor: [''],
		count: 0,
		click: true,
		color: 'aqua',
		price: 10000
	}
];

const new_products = [];
let i = 0;
for (const product of products) {
	for (const flavorName of product.flavor) {
		i += 1;
		product.id = i;
		product.flavorName = flavorName;
		new_products.push(JSON.parse(JSON.stringify(product)));
	}
}

console.log(new_products);
export default {
	products: new_products
};
