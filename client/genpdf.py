from fpdf import FPDF

class ChatPDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'Chat Transcript', ln=True, align='C')
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

    def add_chat_message(self, role, message):
        self.set_font('Arial', 'B' if role == 'user' else '', 12)
        self.multi_cell(0, 10, f"{role.capitalize()}: {message}")
        self.ln(2)

pdf = ChatPDF()
pdf.add_page()

chat_messages = [
    ("user", "create pdf using pdfkit"),
    ("assistant", "To create a PDF using `pdfkit`, you'll need to follow a few steps in your Python environment..."),
    ("user", "in node js"),
    ("assistant", "Ah gotcha — if you want to generate a PDF using `pdfkit` in **Node.js**, you're looking at a **different package**..."),
    ("user", "app.use('/pdfs', express.static(\"./documents\"));\n\nwhen i try to get a file from the server it says cannot get"),
    ("assistant", "Got it — you're trying to serve static PDF files using Express, but you're hitting a `Cannot GET` error. Let’s fix that..."),
    ("user", "pdf is not created"),
    ("assistant", "Ahh okay — if the **PDF is not being created**, let’s troubleshoot step by step..."),
    ("user", "EISDIR: illegal operation on a directory, open 'C:\\Users\\2897197\\Desktop\\project\\pc-bot\\server\\documents"),
    ("assistant", "Ah yes — that error tells us exactly what’s wrong: You're trying to open a *directory* like it's a *file*..."),
    ("user", "Uncaught Exception: [Error: ENOENT: no such file or directory, open '/var/task/server/utils/documents/policy_AA34000003.pdf']"),
    ("assistant", "Thanks for sharing the full error — this one is super clear..."),
    ("user", "Error: ENOENT: no such file or directory, mkdir '/var/task/server/utils/documents'"),
    ("assistant", "Ah, now it's crystal clear — you're running this in a **serverless environment**..."),
    ("user", "what should i do to access that"),
    ("assistant", "Great question! To **access the PDF** you're generating in the backend..."),
    ("user", "express"),
    ("assistant", "Perfect! You're using **Express** — awesome, that makes things nice and straightforward..."),
    ("user", "in vercel the pdf stores on tmp directory how can do for that diretcory like express.static"),
    ("assistant", "Ah, great follow-up! You're deploying on **Vercel**, and want to **serve generated PDFs stored in `/tmp`**..."),
    ("user", "yes"),
    ("assistant", "Awesome — let's build this **for Vercel's `api/` functions**, where you want to: ✅ Generate a PDF ✅ Store (temporarily) in `/tmp` ✅ Serve it through an API route..."),
    ("user", "give as a pdf the whole chat")
]

for role, message in chat_messages:
    pdf.add_chat_message(role, message)

pdf.output("chat_transcript.pdf")
print("✅ PDF saved as chat_transcript.pdf")
