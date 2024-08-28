export const emailTemplate = (user: {
    email: string;
    name: string;
}) =>
    `
<div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: auto;">
    <div style="background-color: #4CAF50; padding: 10px; text-align: center; border-radius: 5px;">
        <h1 style="color: #fff; margin: 0;">Your Travel Itinerary is Ready!</h1>
    </div>
    
    <div style="padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <p>Dear <strong>${user.name}</strong>,</p>
        
        <p>We're excited to share your personalized travel itinerary with you that is on the basis on your travel likings! Below, you'll find all the details you'll need to make your journey unforgettable.</p>

        <p>Attached to this email, you'll find a PDF containing your day-by-day itinerary, complete with maps, recommended places to visit, and much more. We've done our best to ensure everything is perfectly tailored to your preferences.</p>

        <h2 style="color: #4CAF50; text-align: center; margin: 20px 0;">Safe Travels!</h2>

        <p>Here are some quick tips for your trip:</p>
        <ul style="margin-left: 20px;">
            <li>Carry all essential documents and travel gear.</li>
            <li>Stay hydrated and protect yourself from the sun.</li>
            <li>Respect the local customs and culture.</li>
        </ul>

        <p>If you have any questions or need further assistance, feel free to <a href="mailto:mustafatrunkwala8@gmail.com" style="color: #4CAF50;">contact us</a>.</p>

        <p>Thank you for choosing our service. We hope you have an amazing experience!</p>

        <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
            &copy; ${new Date().getFullYear()} Mustafa Trunkwala. All rights reserved.<br/>
            @Mustafa Trunkwala, your travel buddy
        </p>
    </div>

    <div style="text-align: center; margin-top: 20px;">
        <a href="https://mustafatrunkwala.tech" style="color: #4CAF50; text-decoration: none; font-weight: bold;">Visit My Website</a>
    </div>
</div>
`;

