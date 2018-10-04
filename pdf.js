const puppeteer   = require('puppeteer')
const URL         = process.argv[2] ? process.argv[2] : 'http://example.com'
const output_path = process.argv[3] ? process.argv[3] : process.cwd() + '/'
const output_file = process.argv[4] ? process.argv[4] : 'test.pdf'

console.log('Generating from: ' + URL);

(async () => {
	const browser = await puppeteer.launch()
	const page    = await browser.newPage()

	await page.goto(URL, {
		waitUntil: 'networkidle2'
	})
	await page.pdf({
		path: output_path + output_file,
		format: 'Letter',
		margin: {
			top: '1cm',
			right: '1cm',
			bottom: '1cm',
			left: '1cm'
		},
		scale: 1,
		printBackground: true
	})

	await browser.close()

	console.log('Generated PDF: ' + output_path + output_file)
})();
