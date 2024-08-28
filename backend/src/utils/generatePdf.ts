import puppeteer from 'puppeteer';
import { generateItineraryHtml } from '@/helper/Templates/itineraryTemplate';
import { Itinerary } from '@interfaces/itinerary.interface';

const generatePDF = async (
    itinerary: Itinerary,
    clientName: string,
    imgUrl: string,
): Promise<Buffer> => { // Return a Buffer instead of a string
    try {
        const html = generateItineraryHtml(itinerary, clientName, imgUrl);

        if (!html) {
            throw new Error('Error in generating HTML');
        }

        const browser = await puppeteer.launch({
            args: ['--disable-setuid-sandbox', '--no-sandbox', '--single-process', '--no-zygote'],
            executablePath: process.env.NODE_ENV === 'PROD' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
        });

        const page = await browser.newPage();
        await page.setContent(html);

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
        });

        await browser.close();

        return Buffer.from(pdfBuffer); // Convert Uint8Array to Buffer
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw new Error("Failed to generate PDF");
    }
};
export default generatePDF;
