export async function onRequestPost(context) {
    try {
        const body = await context.request.json();

        const response = await fetch(`https://formspree.io/f/${context.env.FORMSPREE_ID}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const text = await response.text();
        console.log("Formspree status:", response.status, text);

        if (response.ok) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, error: text }), { status: 500 });
        }
    } catch (err) {
        console.log("Error:", err.message);
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
}