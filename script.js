let qaData = [];

const quotes = [
  "🧠 'The best investment you can make is in yourself.'",
  "💡 'Price is what you pay. Value is what you get.'",
  "⏳ 'Someone’s sitting in the shade today because someone planted a tree a long time ago.'",
  "📚 'Risk comes from not knowing what you're doing.'",
  "💸 'Rule No.1: Never lose money. Rule No.2: Never forget rule No.1.'"
];

fetch('qa.json')
  .then(response => response.json())
  .then(data => {
    qaData = data;
  });

function getResponse(userInputText) {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = userInputText || input.value.trim().toLowerCase();

  if (!userText) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.textContent = "🧍 " + (userInputText || input.value);
  chatBox.appendChild(userMsg);

  let response = "🤔 I didn't quite get that. Try asking about stocks, bonds, inflation, or ETFs.";

  for (let item of qaData) {
    if (item.keywords.some(keyword => userText.includes(keyword))) {
      response = item.answer;
      break;
    }
  }

  const botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.textContent = "🤖 " + response;
  chatBox.appendChild(botMsg);

  const quote = document.createElement("div");
  quote.className = "bot-msg";
  quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  chatBox.appendChild(quote);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

function suggestQuestion(text) {
  document.getElementById("user-input").value = text;
  getResponse(text.toLowerCase());
}


[
  {
    "keywords": ["stock", "stocks", "share"],
    "answer": "📈 A stock represents ownership in a company. Shareholders benefit from its success through price appreciation and dividends."
  },
  {
    "keywords": ["bond", "bonds"],
    "answer": "💵 A bond is a fixed-income investment where you lend money to an entity (government or corporate) and receive regular interest payments."
  },
  {
    "keywords": ["cedear", "ceadars"],
    "answer": "🌎 CEDEARs allow you to invest in foreign companies through the Argentine stock market, using pesos."
  },
  {
    "keywords": ["compound interest"],
    "answer": "🔁 Compound interest means earning interest on both your original money and the interest it already earned. It grows faster over time."
  },
  {
    "keywords": ["dividend", "dividends"],
    "answer": "💰 Dividends are a share of a company’s profits paid to shareholders, usually on a regular basis."
  },
  {
    "keywords": ["inflation"],
    "answer": "📉 Inflation is the rate at which prices rise and purchasing power falls over time. Investing helps protect your money from inflation."
  },
  {
    "keywords": ["etf", "etfs"],
    "answer": "📊 An ETF (Exchange-Traded Fund) is a basket of assets like stocks or bonds that you can buy or sell on a stock exchange like a regular share."
  },
  {
    "keywords": ["fci", "mutual fund"],
    "answer": "💼 FCI stands for 'Fondo Común de Inversión' (mutual fund). It pools money from many investors to invest in various assets."
  }
]


let checkupStep = 0;
let checkupAnswers = [];

function startCheckup() {
  checkupStep = 1;
  checkupAnswers = [];
  showCheckupQuestion("1️⃣ Do you know how much you spend each month? (yes / no)");
}

function showCheckupQuestion(questionText) {
  const chatBox = document.getElementById("chat-box");
  const botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.textContent = "🤖 " + questionText;
  chatBox.appendChild(botMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("user-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") getResponse();
});

function getResponse(userInputText) {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = userInputText || input.value.trim().toLowerCase();

  if (!userText) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.textContent = "🧍 " + (userInputText || input.value);
  chatBox.appendChild(userMsg);

  if (checkupStep > 0) {
    handleCheckup(userText);
    input.value = "";
    return;
  }

  let response = "🤔 I didn't quite get that. Try asking about stocks, bonds, inflation, or ETFs.";

  for (let item of qaData) {
    if (item.keywords.some(keyword => userText.includes(keyword))) {
      response = item.answer;
      break;
    }
  }

  const botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.textContent = "🤖 " + response;
  chatBox.appendChild(botMsg);

  const quote = document.createElement("div");
  quote.className = "bot-msg";
  quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  chatBox.appendChild(quote);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleCheckup(answer) {
  checkupAnswers.push(answer);

  if (checkupStep === 1) {
    checkupStep++;
    showCheckupQuestion("2️⃣ Do you have high-interest debt (like credit cards)? (yes / no)");
  } else if (checkupStep === 2) {
    checkupStep++;
    showCheckupQuestion("3️⃣ Do you have an emergency fund that covers 3-6 months of expenses? (yes / no)");
  } else if (checkupStep === 3) {
    checkupStep = 0;
    showCheckupResults();
  }
}

function showCheckupResults() {
  const [spending, debt, emergency] = checkupAnswers.map(a => a.includes("yes"));

  let summary = "📊 Your Financial Checkup Results:\n";

  if (!spending) summary += "• Try tracking your expenses to improve financial awareness.\n";
  if (debt) summary += "• Consider paying off high-interest debt first. It's often your biggest drain.\n";
  if (!emergency) summary += "• Building an emergency fund gives you peace of mind during uncertain times.\n";

  if (spending && !debt && emergency)
    summary += "✅ You’re on a solid path! Keep investing and learning 💪.";

  const chatBox = document.getElementById("chat-box");
  const botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.textContent = "🤖 " + summary;
  chatBox.appendChild(botMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
