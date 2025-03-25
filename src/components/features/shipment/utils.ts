// Action handlers for shipment operations
import { saveAs } from "file-saver"; // You'll need to install this package
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; // You'll need to install this package
import { Shipment } from "./shipment.page";

// View shipment details action
export const viewShipmentDetails = (shipmentId: string) => {
  // This function is already being called correctly in your code
  // It navigates to the details page
  return `/shipments/${shipmentId}/details`;
};

// Download receipt action
export const downloadReceipt = async (shipment: Shipment) => {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([550, 750]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Add content to PDF
    page.drawText("SHIPPING RECEIPT", {
      x: 50,
      y: height - 50,
      size: 20,
      font: boldFont,
    });

    // Draw company logo placeholder
    page.drawRectangle({
      x: width - 150,
      y: height - 70,
      width: 100,
      height: 50,
      color: rgb(0.9, 0.9, 0.9),
    });

    // Shipment details
    const details = [
      `Tracking ID: ${shipment.id}`,
      `Date: ${shipment.date}`,
      `Status: ${
        shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)
      }`,
      `Origin: ${shipment.origin}`,
      `Destination: ${shipment.destination}`,
      `Recipient: ${shipment.recipient.name}`,
      `Type: ${shipment.type}`,
      `Items: ${shipment.items}`,
      `Weight: ${shipment.weight}`,
      `Value: ${shipment.value}`,
      `ETA: ${shipment.eta}`,
    ];

    // Add shipment details to PDF
    let y = height - 100;
    for (const detail of details) {
      page.drawText(detail, {
        x: 50,
        y,
        size: 12,
        font,
      });
      y -= 20;
    }

    // Add thank you note
    page.drawText("Thank you for shipping with us!", {
      x: 50,
      y: 100,
      size: 14,
      font: boldFont,
    });

    // Save PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, `shipping-receipt-${shipment.id}.pdf`);

    return true;
  } catch (error) {
    console.error("Error generating receipt:", error);
    return false;
  }
};

// Generate shipping label action
export const generateLabel = async (shipment: Shipment) => {
  try {
    // Create a new PDF document for the shipping label
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Draw border
    page.drawRectangle({
      x: 10,
      y: 10,
      width: width - 20,
      height: height - 20,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    // Add title
    page.drawText("SHIPPING LABEL", {
      x: 20,
      y: height - 40,
      size: 16,
      font: boldFont,
    });

    // Add QR code placeholder
    page.drawRectangle({
      x: width - 120,
      y: height - 120,
      width: 100,
      height: 100,
      color: rgb(0.9, 0.9, 0.9),
    });

    // Add tracking number
    page.drawText(`TRACKING #: ${shipment.id}`, {
      x: 20,
      y: height - 70,
      size: 14,
      font: boldFont,
    });

    // From address
    page.drawText("FROM:", {
      x: 20,
      y: height - 140,
      size: 12,
      font: boldFont,
    });

    page.drawText(`ORIGIN: ${shipment.origin}`, {
      x: 20,
      y: height - 160,
      size: 10,
      font,
    });

    // To address
    page.drawText("SHIP TO:", {
      x: 20,
      y: height - 200,
      size: 12,
      font: boldFont,
    });

    page.drawText(`${shipment.recipient.name}`, {
      x: 20,
      y: height - 220,
      size: 14,
      font: boldFont,
    });

    page.drawText(`DESTINATION: ${shipment.destination}`, {
      x: 20,
      y: height - 240,
      size: 10,
      font,
    });

    // Package details
    page.drawText(`Weight: ${shipment.weight}`, {
      x: 20,
      y: height - 280,
      size: 10,
      font,
    });

    page.drawText(`Items: ${shipment.items}`, {
      x: 20,
      y: height - 300,
      size: 10,
      font,
    });

    page.drawText(`Type: ${shipment.type}`, {
      x: 20,
      y: height - 320,
      size: 10,
      font,
    });

    // Add barcode placeholder
    page.drawRectangle({
      x: 50,
      y: 50,
      width: width - 100,
      height: 80,
      color: rgb(0.9, 0.9, 0.9),
    });

    // Save PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, `shipping-label-${shipment.id}.pdf`);

    return true;
  } catch (error) {
    console.error("Error generating shipping label:", error);
    return false;
  }
};
