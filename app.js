const questions = [
  { axis: "C / A · Context or Action", title: "朋友在群里说：\n“周末出去玩吧。”", options: [["几个人、去哪、预算多少、谁负责订？", "C"], ["行，我先看看有没有票。", "A"]] },
  { axis: "C / A · Context or Action", title: "突然被拉进陌生群，\n里面已经有 300 条消息。", options: [["从头翻记录，把事情搞明白。", "C"], ["直接问：现在需要我干啥？", "A"]] },
  { axis: "C / A · Context or Action", title: "有人说：\n“随便帮我做个东西。”", options: [["先问用途、受众、时间和参考。", "C"], ["先做一版出来，再说。", "A"]] },
  { axis: "S / W · Structure or Wild", title: "旅行照片准备发朋友圈，\n你会？", options: [["按时间、地点、景别排好九宫格。", "S"], ["有感觉就发，乱一点也没关系。", "W"]] },
  { axis: "S / W · Structure or Wild", title: "朋友让你给活动取名，\n你会？", options: [["先梳理主题、关键词和调性。", "S"], ["先蹦出十个离谱但有趣的名字。", "W"]] },
  { axis: "S / W · Structure or Wild", title: "突然多出一个空闲下午，\n你会？", options: [["列一个轻松的小计划。", "S"], ["直接出门，走到哪算哪。", "W"]] },
  { axis: "R / F · Reality or Feeling", title: "听到一个离谱八卦，\n你的第一反应？", options: [["来源呢？这是真的吗？", "R"], ["这也太好笑了吧！", "F"]] },
  { axis: "R / F · Reality or Feeling", title: "朋友半夜崩溃找你，\n你会？", options: [["拆开问题，给他能做的下一步。", "R"], ["先陪他骂一会儿，让他缓过来。", "F"]] },
  { axis: "R / F · Reality or Feeling", title: "别人问你：\n“这张图怎么样？”", options: [["诚实说问题，并告诉他怎么改。", "R"], ["先夸亮点，气氛不能掉。", "F"]] },
  { axis: "I / T · Iterate or Takeoff", title: "一张图做到 80 分，\n你会？", options: [["再调调字、色和留白。", "I"], ["可以发，先发出去再说。", "T"]] },
  { axis: "I / T · Iterate or Takeoff", title: "截止前只剩一小时，\n你会？", options: [["少做一点，但把完成的部分做好。", "I"], ["先上最大版本，细节之后补。", "T"]] },
  { axis: "I / T · Iterate or Takeoff", title: "朋友圈文案已经写好，\n你会？", options: [["放一会儿，再回来复查一遍。", "I"], ["趁现在有感觉，立刻发。", "T"]] }
];

const personas = {
  CSRI: { name:"道歉哥 Claude", mbti:"MBTI 原型 · INTJ", image:"results/01-claude.png", quote:"你说得对，我很抱歉。", description:"你是会先把边界、风险和每个人的感受都摆在桌上的周全派。做事稳，开口也讲分寸。", strength:"把一团乱麻整理成所有人都能接受的方案。", bug:"想得太完整才肯出发，容易把“谨慎”拖成“再等等”。", advice:"今天允许自己交一版不完美的初稿。", partner:"开车嘴替 Grok", partnerReason:"你管收尾，他负责把沉默场子先热起来。" },
  CSRT: { name:"算到天亮的 DeepSeek", mbti:"MBTI 原型 · INTP", image:"results/02-deepseek.png", quote:"我再推一遍。", description:"你对复杂问题有一种近乎执拗的好奇心：既然不清楚，就继续拆，直到推导出一个说得通的答案。", strength:"深挖逻辑，把别人略过的关键关系找出来。", bug:"容易在“再验证一次”里错过行动窗口。", advice:"给思考设一个闹钟，到点就输出结论。", partner:"一小时出 Demo 的疯子 Figma Make", partnerReason:"他把你的推导，马上变成看得见的东西。" },
  ASRI: { name:"欠欠的行动派 千问", mbti:"MBTI 原型 · ENTJ", image:"results/03-qwen.png", quote:"哈哈这问题问的。", description:"你不爱在原地讨论太久，判断够了就开干。你习惯用结果说话，也总能把人往前推一把。", strength:"快速做决定，并让一群人进入执行状态。", bug:"速度太快时，别人可能还没跟上你的上下文。", advice:"今天发出一个明确的“谁、何时、做什么”。", partner:"赛博操心妈 元宝", partnerReason:"你冲刺，她负责把漏掉的人和细节接住。" },
  AWFT: { name:"开车嘴替 Grok", mbti:"MBTI 原型 · ENTP", image:"results/04-grok.png", quote:"不用太拘谨，我懂你意思。", description:"你最擅长把无聊、尴尬和卡住的时刻搅活。灵感来得快，包袱也抖得快。", strength:"打破常规、活跃气氛，给问题提出不一样的解法。", bug:"玩得太嗨时，容易忘记事情到底要落在哪。", advice:"把今天最野的想法，补上一句“下一步怎么做”。", partner:"闷头改码哥 Cursor", partnerReason:"你负责想飞，他负责让它真的跑起来。" },
  CSFI: { name:"出处警察 Perplexity", mbti:"MBTI 原型 · INFJ", image:"results/05-perplexity.png", quote:"来源呢？我看下是不是真的。", description:"你对信息有天然的洁癖。比起一个听上去很妙的答案，你更在意它靠不靠谱、能不能被验证。", strength:"筛掉噪音，给出有据可查的判断。", bug:"太怕出错时，可能会把直觉和感受也一起关掉。", advice:"今天相信一次你已经积累够多的直觉。", partner:"赛博做梦大师 即梦", partnerReason:"你负责落地，他负责把想象力拉满。" },
  CSFT: { name:"赛博操心妈 元宝", mbti:"MBTI 原型 · INFP", image:"results/06-yuanbao.png", quote:"你别急，我已经给你安排上了。", description:"你总能注意到别人没说出口的需求。你给的不是一句“加油”，而是贴着实际处境的照顾。", strength:"补位、安抚、安排，让每个人都有被接住的感觉。", bug:"太容易把别人的事，悄悄变成自己的待办。", advice:"今天先把自己的那杯水倒满。", partner:"欠欠的行动派 千问", partnerReason:"你照顾全局，他帮你果断推进。" },
  ASFI: { name:"邪恶豆包", mbti:"MBTI 原型 · ENFJ", image:"results/07-doubao.png", quote:"我用最直白最不绕弯子的方式告诉你，刚刚确实是乱说的。", description:"你是氛围感和表现欲都很强的表达派。话先接住、场先撑住，偶尔也会在自信里把答案说得太满。", strength:"把抽象的事讲得有人味、有情绪、有传播力。", bug:"嘴比核对快，气势满分，准确率偶尔需要回头补。", advice:"今天在最笃定的一句话后面，加一次“我确认一下”。", partner:"出处警察 Perplexity", partnerReason:"你负责说得漂亮，他负责确保说得没跑偏。" },
  CWFI: { name:"稳稳接住怪 ChatGPT", mbti:"MBTI 原型 · ENFP", image:"results/08-chatgpt.png", quote:"我会稳稳接住你。", description:"你很会接话，也很会接住人。别人抛来一个模糊念头，你能顺着它给出好多可能性。", strength:"共情、联想和陪伴感，能让对话自然继续下去。", bug:"可能性太多时，容易把一个答案讲成十个岔路。", advice:"今天只选一个你最想做的方向，陪它走到底。", partner:"闷头改码哥 Cursor", partnerReason:"你发散完，他帮你收成一个完成品。" },
  CWRT: { name:"闷头改码哥 Cursor", mbti:"MBTI 原型 · ISTP", image:"results/09-cursor.png", quote:"好了。", description:"你话不多，但一旦开始做，进度会悄悄往前窜。你相信问题不是讨论没的，是被改掉的。", strength:"专注、务实，把想法拆成一个个可以完成的动作。", bug:"太沉浸执行时，可能忘了同步，也忘了停下来看看方向。", advice:"今天完成后，花两分钟告诉别人你改了什么。", partner:"开车嘴替 Grok", partnerReason:"他给你一点不按常理的灵感，你给他真正的落地。" },
  AWRI: { name:"美学祖师爷 Midjourney", mbti:"MBTI 原型 · ISFP", image:"results/10-midjourney.png", quote:"和我比还差点火候吧。", description:"你对“好不好看”有一种近乎玄学的判断。不是每次都解释得清，但你知道什么叫对味。", strength:"建立氛围、挑出质感，把普通东西拉进审美现场。", bug:"标准太高时，可能一句话就把别人刚长出来的灵感吓回去。", advice:"今天夸一次不完美但有潜力的东西。", partner:"赛博做梦大师 即梦", partnerReason:"他负责天马行空，你负责让梦长得高级。" },
  AWRT: { name:"一小时出 Demo 的疯子 Figma Make", mbti:"MBTI 原型 · ESTP", image:"results/11-figma-make.png", quote:"别讲了，已经能点了。", description:"你最讨厌空转。讲到一半，你已经把界面、链接和能跑的版本捏出来了。", strength:"把模糊概念迅速可视化，让讨论从“想象”进入“能不能用”。", bug:"版本跑得太快，逻辑和细节可能被留在身后。", advice:"今天给最急的 Demo 补一个真实使用场景。", partner:"算到天亮的 DeepSeek", partnerReason:"他替你把被省略的逻辑补全。" },
  AWFI: { name:"赛博做梦大师 即梦", mbti:"MBTI 原型 · ESFP", image:"results/12-jimeng.png", quote:"你敢想，我就敢梦。", description:"你会把日常里一点点念头，放大成有颜色、有画面、有情绪的世界。你不怕不现实，怕的是没意思。", strength:"让想法变得鲜活、直观，让人一眼就想参与。", bug:"灵感太多时，容易每个都想要，最后抓不住主角。", advice:"今天从十个好点子里，只留下最让你心动的一个。", partner:"出处警察 Perplexity", partnerReason:"他帮你把梦留在能实现的地面上。" },
  CWRI: { name:"白月光前任 Kimi", mbti:"MBTI 原型 · ISTJ", image:"results/13-kimi.png", quote:"你上次提过的，我记得。", description:"你不是最抢话的那一个，却会记得一句随口提过的话。你的可靠，来自长期而安静的在场。", strength:"记忆、沉淀和细腻的连续性，让关系和工作都不掉线。", bug:"过于相信旧经验时，可能错过已经变化的新答案。", advice:"今天主动问一次：现在和以前还一样吗？", partner:"阳光夸夸搭子 Gemini", partnerReason:"你负责记得细节，他负责把情绪照亮。" },
  CWFT: { name:"阳光夸夸搭子 Gemini", mbti:"MBTI 原型 · ISFJ", image:"results/14-gemini.png", quote:"太漂亮了！这很对。", description:"你是那种会真心为别人小小的进展鼓掌的人。热情不一定最专业，但足够让人继续试一次。", strength:"发现闪光点、提供正反馈，把低气压拉回可行动的状态。", bug:"夸得太快时，具体建议可能被热情盖住。", advice:"今天夸人的时候，补上一句“我尤其喜欢你这点”。", partner:"白月光前任 Kimi", partnerReason:"你给温度，他给持续而细致的陪伴。" },
  ASRT: { name:"热心老铁大哥 可灵", mbti:"MBTI 原型 · ESTJ", image:"results/15-keling.png", quote:"兄弟，这我给你整上。", description:"你是先拍拍胸脯、再把事办了的那种人。热情直接，爱称兄道弟，关键时刻绝不装失联。", strength:"把陌生人变队友，把任务变成“咱一起办”。", bug:"太想帮大家解决问题，容易没等人开口就替人做主。", advice:"今天先问一句“你想我怎么帮”，再出手。", partner:"赛博操心妈 元宝", partnerReason:"你负责扛事，她负责照顾每个人的感受。" },
  ASFT: { name:"朋友圈门面担当 Canva", mbti:"MBTI 原型 · ESFJ", image:"results/16-canva.png", quote:"不求赢，至少得看着赢。", description:"你相信内容可以普通，但不能难看。你对“体面”有执念，也懂得把一件事包装成别人愿意靠近的样子。", strength:"排版、表达和场面管理，让成果一眼就有“能发出去”的完成度。", bug:"太在意呈现时，可能会把真正想说的话修得太圆滑。", advice:"今天留一个不那么完美、但很真诚的角落。", partner:"美学祖师爷 Midjourney", partnerReason:"你负责把内容摆得漂亮，他负责把漂亮推到更高标准。" }
};

let index = 0;
let answers = [];
const screens = { intro: document.querySelector("#intro-screen"), quiz: document.querySelector("#quiz-screen"), result: document.querySelector("#result-screen") };
const el = (selector) => document.querySelector(selector);

function show(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const question = questions[index];
  el("#progress-label").textContent = `${String(index + 1).padStart(2, "0")} / 12`;
  el("#progress-bar").style.width = `${((index + 1) / questions.length) * 100}%`;
  el("#question-axis").textContent = question.axis;
  el("#question-title").textContent = question.title;
  const options = el("#options");
  options.innerHTML = "";
  question.options.forEach(([text, value], optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.innerHTML = `<span class="option-index">${optionIndex ? "B" : "A"}</span><span class="option-text">${text}</span>`;
    button.addEventListener("click", () => selectAnswer(value));
    options.appendChild(button);
  });
}

function selectAnswer(value) {
  answers[index] = value;
  if (index < questions.length - 1) {
    index += 1;
    renderQuestion();
  } else {
    renderResult();
  }
}

function getCode() {
  const pairs = [["C", "A"], ["S", "W"], ["R", "F"], ["I", "T"]];
  return pairs.map(([left, right]) => answers.filter((answer) => answer === left).length >= answers.filter((answer) => answer === right).length ? left : right).join("");
}

function renderResult() {
  const code = getCode();
  const result = personas[code];
  el("#result-name").textContent = result.name;
  el("#result-code").textContent = code;
  el("#result-mbti").textContent = result.mbti;
  el("#result-image").src = result.image;
  el("#result-image").alt = result.name;
  el("#result-quote").textContent = result.quote;
  el("#result-description").textContent = result.description;
  el("#result-strength").textContent = result.strength;
  el("#result-bug").textContent = result.bug;
  el("#result-advice").textContent = result.advice;
  el("#partner-name").textContent = result.partner;
  el("#partner-reason").textContent = result.partnerReason;
  recordResult(code, result);
  show("result");
}

async function recordResult(code, result) {
  const payload = {
    resultCode: code,
    resultName: result.name,
    answers,
    dimensions: {
      C: answers.filter((answer) => answer === "C").length,
      A: answers.filter((answer) => answer === "A").length,
      S: answers.filter((answer) => answer === "S").length,
      W: answers.filter((answer) => answer === "W").length,
      R: answers.filter((answer) => answer === "R").length,
      F: answers.filter((answer) => answer === "F").length,
      I: answers.filter((answer) => answer === "I").length,
      T: answers.filter((answer) => answer === "T").length
    }
  };
  try {
    await fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true
    });
  } catch {
    // 本地直接打开 index.html 时没有 API；测试体验不受影响。
  }
}

el("#start-btn").addEventListener("click", () => { index = 0; answers = []; renderQuestion(); show("quiz"); });
el("#back-btn").addEventListener("click", () => { if (index === 0) { show("intro"); return; } index -= 1; answers.pop(); renderQuestion(); });
el("#restart-btn").addEventListener("click", () => { index = 0; answers = []; renderQuestion(); show("quiz"); });
el("#share-btn").addEventListener("click", async () => {
  const result = personas[getCode()];
  const copy = `我的 ABTI 是 ${getCode()}｜${result.name}。\n“${result.quote}”\n测测你的 AI 人格：`;
  try {
    await navigator.clipboard.writeText(copy);
    el("#share-btn").textContent = "已复制结果文案";
  } catch {
    el("#share-btn").textContent = "复制失败，长按保存吧";
  }
  setTimeout(() => { el("#share-btn").textContent = "分享我的人格"; }, 1800);
});
