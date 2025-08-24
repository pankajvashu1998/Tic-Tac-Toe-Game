import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tic Tac Toe Onlien Free Game - Play Free ",
  description:
    "Play the classic Tic Tac Toe game online! Challenge friends or AI, improve your strategy, and enjoy endless X & O fun. Simple, interactive, and responsive design for all devices.",
  keywords: [
    "Tic Tac Toe",
    "X and O",
    "Online Game",
    "Strategy Game",
    "Free Game",
    "Two Player Game",
    "Fun Game",
    "HTML5 Game",
    "Classic Game",
    "google tic-tac-toe",
    "tic tac toe online",
    "tic tac toe 2 player",
    "tic tac toe game",
    "xo game",
    "tic tac toe 2 player online",
    "tik tak tok",
    "tic-tac-toe game",
    "tiktok game",
    "tictactoe",
    "tic tac toe google 2 player",
    "google tic tac toe",
    "tic tac game",
    "tic-tac-toe tic-tac-toe",
    "tic tac toe game with ai",
    "tic tac toe game with computer",
    "tik tak to game ai",
    "ox game free",
    "nexora game",
    "nexora",
    "nexora fun",
  ],
  authors: [{ name: "Nexora Fun" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
