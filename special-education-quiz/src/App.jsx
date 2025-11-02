import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Questions populated from user's provided 20 questions
const QUESTIONS = [
  {
    id: 1,
    title: "就学に関する仕組みの改正",
    question:
      '2013年9月1日に施行された「学校教育法施行令の一部改正」について、最も適切なものはどれか。',
    choices: [
      '従来の「就学指導委員会」は、法律上すべて廃止された。',
      '市町村教育委員会は、視覚障害者等が小・中学校に就学する際に、児童生徒等の就学に関する専門的知識を有する者の意見を聴くこととする。',
      '特別支援学校・小中学校間の転学については、障害の状態に変化があった場合にのみ行うことができる。',
      '「障害者等」の定義に関わる学校教育法施行令第22条の3は、改正によって削除された。'
    ],
    answerIndex: 1,
    explanation:
      '解答：②。2013年の改正で、市町村教育委員会が視覚障害者等の就学時に専門的知識を有する者の意見を聴くことが定められた。'
  },
  {
    id: 2,
    title: "特別支援教育の理念",
    question: "特別支援教育の理念に関する記述として、最も適切なものはどれか。",
    choices: [
      "特別支援教育は、障害を克服し、健常者と同じ生活を送ることを指導の目的とする。",
      "特別支援教育は、主として障害のある幼児児童生徒の学習上の困難さに焦点を当てて指導・支援を行うものである。",
      "特別支援教育は、これまでの特殊教育の対象の障害だけでなく、知的な遅れのない発達障害を持つ者も対象に含め、特別支援学校や特別支援学級のみで支援を行う。",
      "障害の有無やその他の個々の違いを認識しつつ様々な人々が生き生きと活躍できる共生社会の形成の基礎となるものである。"
    ],
    answerIndex: 3,
    explanation:
      "解答：④。特別支援教育は共生社会の形成の基礎となる理念を持ち、障害の有無に関わらず個別的ニーズを重視する。"
  },
  {
    id: 3,
    title: "学習のUDL",
    question:
      "学習のユニバーサルデザイン（UDL）を構成する3つの原則に関する記述として、誤っているものはどれか。",
    choices: [
      "原則1：課題理解と提示の工夫（学ぶ内容を先に示す、重要な語句の説明など）。",
      "原則2：考えの表現と課題解決（主体的な意思表現を促進する支援、課題解決のための支援など）。",
      "原則3：学びの自己管理と意欲（達成感のある課題設定、次の学びへつなげる支援など）。",
      "UDLは、成績下位群に対してのみ有効であり、成績上位群の学力向上には寄与しない。"
    ],
    answerIndex: 3,
    explanation:
      "解答：④。UDLはすべての学習者を対象にする設計であり、下位群限定の手法ではない。"
  },
  {
    id: 4,
    title: "合理的配慮",
    question:
      'インクルーシブ教育システムにおける「合理的配慮」に関する記述として、最も適切なものはどれか。',
    choices: [
      "合理的配慮は、通常のやり方で学習参加が難しい児童生徒に対し、学校が個別に提供する配慮である。",
      "公立学校においては努力義務であり、私立学校においては法的義務として提供が求められる。",
      "合理的配慮を訴え出るためには、自己理解は不要であり、保護者が一方的に申し出ればよい。",
      "合理的配慮は、教育の質の保証を目的とし、すべての子どもを対象としたユニバーサルな対応として提供される。"
    ],
    answerIndex: 0,
    explanation:
      "解答：①。合理的配慮は個別的な配慮であり、公立では法的義務・私立では努力義務と扱われる。"
  },
  {
    id: 5,
    title: "個別の教育支援計画 (IPE)",
    question:
      "「個別の教育支援計画」の概念に関する記述として、最も適切なものはどれか。",
    choices: [
      "個別の教育支援計画は、個別の指導計画と用語法が違い、実際に両者が作成されることはない。",
      "障害福祉サービスの利用計画や個別支援計画は、教育領域で作成される個別の指導計画に包含される。",
      "個別の教育支援計画は、乳幼児期から学校卒業後まで一貫した支援を受けられるよう、福祉、医療、教育等の関係機関と連携するための総合的な枠組みを提供する。",
      "障害者基本法では、教育と福祉が協働した総合計画の作成は求められていない。"
    ],
    answerIndex: 2,
    explanation:
      "解答：③。IPEは乳幼児期から学校卒業後まで一貫した支援を行うため、関係機関との連携を図る総合的枠組みを提供する。"
  },
  {
    id: 6,
    title: "個別の指導計画 (IPP)",
    question:
      "特別支援学校や特別支援学級における個別の指導計画に関する説明として、誤っているものはどれか。",
    choices: [
      "個別の指導計画は、認知発達や障害の状態に合わせ、きめ細かな指導を提供する目的で作成される。",
      "個別指導の際には、児童生徒の失敗体験を防ぐ視点だけでなく、その児童生徒が確実に学習内容をクリアできるような学習過程を構成することが重要である。",
      "個別の指導計画は、指導の種類や頻度、指導方法や内容が概ね規定されたものに従って作成され、これを成果があがった前例に則して指導を実施することが重要である。",
      "個別の指導計画は、自立活動を指導する際の基礎となる計画であり、その作成と活用が重要視される。"
    ],
    answerIndex: 2,
    explanation:
      "解答：③。個別の指導計画は画一的な前例に従うものではなく、個々の児童生徒に合わせて柔軟に設計されることが重要である。"
  },
  {
    id: 7,
    title: "特別支援教育コーディネーター",
    question:
      "特別支援教育コーディネーターの役割に関する説明として、誤っているものはどれか。",
    choices: [
      "校内支援体制の構築において中心的な役割を果たす。",
      "校内だけでなく、家庭や医療、福祉、労働機関等の校外の関係機関、外部専門家と連携した支援のあり方を推進する。",
      "個別の指導計画や個別の教育支援計画の作成において、中心的な役割を担う。",
      "コーディネーターは、校内での連絡調整に限定して活動し、地域の関係機関との連携は校長が責任を持つべきである。"
    ],
    answerIndex: 3,
    explanation:
      "解答：④。コーディネーターは校内外の連携を推進する役割を持ち、地域機関との連携も重要な仕事である。"
  },
  {
    id: 8,
    title: "通級による指導",
    question:
      "通級による指導に関する記述として、誤っているものはどれか。",
    choices: [
      "通級による指導は、平成5年（1993年）に制度化され、対象となる障害種が以前より多くなっている。",
      "通級による指導を受けている児童生徒の数は、中学校よりも小学生の方が約1.5倍多く、小学校の生徒の数が圧倒的に多い状況にある。",
      "通級による指導の対象となる言語障害児の中で、子どもの割合が最も高い障害種は言語障害である。",
      "通級による指導では、通常、自立活動を中心とした特別の教育課程を編成し、通常の学級との連携を図る。"
    ],
    answerIndex: 1,
    explanation:
      "解答：②。提示された過去問では②が誤りであるとされている。"
  },
  {
    id: 9,
    title: "自立活動",
    question:
      "特別支援教育における「自立活動」の説明として、最も適切なものはどれか。",
    choices: [
      "自立活動は、主に個々の児童生徒の社会的、職業的自立に焦点を当てた学習内容で構成される。",
      "自立活動は、他の教科等とは独立して、発達段階に関係なく、画一的に内容を編成する。",
      "自立活動は、児童生徒一人ひとりの学びの困難さや、生活上のどのような課題があるのかという観点から、個別に行うことが重要である。",
      "自立活動の内容設定は、観察される障害の状態に対応した医学的診断のみに基づいて行うことが重要である。"
    ],
    answerIndex: 2,
    explanation:
      "解答：③。自立活動は個々の学びの困難さや生活課題に基づき個別に行うことが重要である。"
  },
  {
    id: 10,
    title: "知的障害教育",
    question:
      "知的障害教育に関する説明として、最も適切なものはどれか。",
    choices: [
      "知的障害教育では、各教科等を合わせた指導の1つとして、主に「生活単元学習」が重視される。",
      "知的障害は特別支援教育の対象ではない。",
      "知的障害教育は、各教科に合わせた指導のみで行い、道徳教育は含まれない。",
      "知的障害教育では、集団指導が基本であり、個別のニーズに応じた指導は推奨されない。"
    ],
    answerIndex: 0,
    explanation:
      "解答：①。生活単元学習は知的障害教育において重視される手法の一つである。"
  },
  {
    id: 11,
    title: "発達障害の特性と支援",
    question:
      "発達障害やそれに伴う困難さを持つ子どもへの支援に関する記述として、誤っているものはどれか。",
    choices: [
      "発達障害を持つ子どもは、心理面や病理面の特徴、およびそれらの相互作用の結果として、二次的な障害を引き起こすことがある。",
      "支援の初期段階では、まず観察や検査等を通じて、感覚や認知、行動の特性など、子ども一人ひとりの実態把握を行うことが重要である。",
      "多様な「育ちと発達の困難」を有する子どもは、不安、緊張、ストレスを日常的に抱えていることが多い。",
      "「育ちと発達の困難」は、子ども全体の課題ではなく、限られた一部の子どもだけの問題として捉えるべきである。"
    ],
    answerIndex: 3,
    explanation:
      "解答：④。育ちと発達の困難は広い範囲に関わる問題であり、限定的に捉えるべきではない。"
  },
  {
    id: 12,
    title: "学習障害 (LD)",
    question:
      "学習障害（LD）を持つ児童生徒への教育的支援に関する記述として、最も適切なものはどれか。",
    choices: [
      "LDを持つ児童生徒は、知的発達の遅れを伴うことが診断の必須条件である。",
      "LDは、知的発達の遅れを伴わず、聞く、話す、読む、書く、計算する、推論する能力のうち、特定のものの習得と使用に著しい困難を示す。",
      "LDの指導においては、子どものニーズに応じた手立てを検討し、個別指導計画に基づき指導を行うことが重要である。",
      "LD児への支援として、読み書きの困難さに対して、読み上げソフトや音声入力を活用することは合理的配慮とは認められない。"
    ],
    answerIndex: 1,
    explanation:
      "解答：②。LDは知的遅れを伴わず、特定の学習領域に著しい困難が生じる障害である。"
  },
  {
    id: 13,
    title: "ADHD",
    question:
      "ADHDの特性に対する支援に関する記述として、誤っているものはどれか。",
    choices: [
      "多動性、衝動性、不注意に対しては環境調整や行動指導も有効である。",
      "教室内のルールや活動の時間、場所の区切りを明確に示すなど学級経営上の配慮が求められる。",
      "衝動性によりルールが守れない子どもには、結果で判断する段階的対応に基づき、よりきめ細かな対応を提供する。",
      "ADHDは、知的発達の遅れを伴わないため、学習上の困難さは生じない。"
    ],
    answerIndex: 3,
    explanation:
      "解答：④。ADHDを持つ児童生徒でも学習上の困難は生じるため、適切な支援が必要である。"
  },
  {
    id: 14,
    title: "ASD の対人関係",
    question:
      "自閉スペクトラム症（ASD）の児童生徒への関わり方や配慮について、誤っているものはどれか。",
    choices: [
      "聴覚的な指示だけではなく、できるだけ具体的に話すことが望ましい。",
      "苦手なことでも頑張るように励ますことが重要である。",
      "曖昧な表現を避け、分かりやすく話しかける。",
      "環境をシンプルに整える。"
    ],
    answerIndex: 1,
    explanation:
      "解答：②。ASDの児童生徒には単に「頑張れ」と励ますだけでは不適切な場合があり、具体的で配慮のある関わりが必要である。"
  },
  {
    id: 15,
    title: "ASD の困難さ",
    question:
      "ASDの児童生徒が抱える「目の前の出来事にとらわれず計画的に行動することの難しさ」に該当する現象はどれか。",
    choices: ["同一性への固執。", "実行機能の障害。", "中枢性統合の弱さ。", "心の理論の障害。"],
    answerIndex: 1,
    explanation:
      "解答：②。計画的に行動することが困難なのは実行機能の障害に該当する。"
  },
  {
    id: 16,
    title: "視覚障害と点字",
    question:
      "視覚障害および点字に関する記述として、最も適切なものはどれか。",
    choices: [
      "水晶体の混濁によっておこる疾患は、緑内障である。",
      "網膜上の視細胞の変性による進行性の疾患は、網膜色素変性症である。",
      "点字は、通常、視覚的にとらえることが難しい人のための文字であり、50音の他、濁音、半濁音、促音、撥音などが、点字やアルファベットではない。",
      "点字は、縦に並んだ2個、横に並んだ3個の合計6個の点の組み合わせで、50音すべてを表す。"
    ],
    answerIndex: 1,
    explanation:
      "解答：②。網膜色素変性症は網膜の視細胞変性による進行性疾患である。"
  },
  {
    id: 17,
    title: "聴覚障害と就学基準",
    question:
      "聾学校への就学に関する説明として、最も適切なものはどれか。",
    choices: [
      "両耳の聴力レベルが概ね60デシベル以上であり、補聴器等の使用によっても通常の会話を理解することが困難な程度である。",
      "両耳の聴力レベルが概ね50デシベル以上であり、補聴器等の使用によっても通常の会話を理解することが困難な程度である。",
      "両耳の聴力レベルが概ね50デシベル以下であり、補聴器等の使用によっても通常の会話を理解することが困難な程度である。",
      "両耳の聴力レベルが概ね60デシベル以下であり、補聴器等の使用によっても通常の会話を理解することが困難な程度である。"
    ],
    answerIndex: 0,
    explanation:
      "解答：①。聾学校への就学基準はおおむね両耳60デシベル以上など、補聴器を使用しても通常会話が困難な程度とされる。"
  },
  {
    id: 18,
    title: "病弱・身体虚弱児の教育",
    question:
      "日本における病気の子どもの教育の場として、誤っているものはどれか。",
    choices: [
      "特別支援学校（病弱）。",
      "小・中学校の病弱・身体虚弱特別支援学級。",
      "高等学校の病弱・身体虚弱特別支援学級。",
      "通級による指導教室。"
    ],
    answerIndex: 2,
    explanation:
      "解答：③。過去問に基づき「高等学校の病弱・身体虚弱特別支援学級」は誤りとされている。"
  },
  {
    id: 19,
    title: "重複障害の教育的支援",
    question:
      "重複障害を持つ児童生徒の教育的支援に関する記述として、最も適切なものはどれか。",
    choices: [
      "重複障害の教育は主に知的障害と肢体不自由の組み合わせに限定される。",
      "障害の状態や特性と合わせて医療的ケアの現状についても触れ、子どものニーズに応じた支援のあり方を理解することが求められる。",
      "重複障害児への指導は個別指導計画ではなく障害種別ごとの一般指導要領に従う。",
      "ICTの活用は学習環境の整備には有効ではない。"
    ],
    answerIndex: 1,
    explanation:
      "解答：②。重複障害では医療的ケアの現状も含めたニーズ把握と教育的支援が重要であり、ICT活用は有効である。"
  },
  {
    id: 20,
    title: "教育支援人材",
    question:
      "「教育支援人材」の説明として、誤っているものはどれか。",
    choices: [
      "登下校の安全管理を行う地域住民も教育支援人材に含まれる。",
      "スクールカウンセラーは児童生徒等の個別支援専門職であるが、教育支援人材には含まれない。",
      "保護者は子どもの教育を行う主たる責任者であり、教育支援人材には含まれない。",
      "授業のゲストスピーカーとなった企業関係者も教育支援人材に含まれる。"
    ],
    answerIndex: 2,
    explanation:
      "解答：③。過去問に基づく記述では、保護者は教育支援人材に含まれると解釈されるため「含まれない」は誤りである。"
  }
];

export default function SpecialNeedsQuiz() {
  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState(QUESTIONS.map((q) => q.id));
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [incorrectIds, setIncorrectIds] = useState([]);
  const [scoreMap, setScoreMap] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sne_quiz_state_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.order) setOrder(parsed.order);
        if (typeof parsed.index === "number") setIndex(parsed.index);
        if (parsed.scoreMap) setScoreMap(parsed.scoreMap);
        if (parsed.incorrectIds) setIncorrectIds(parsed.incorrectIds);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const payload = { order, index, scoreMap, incorrectIds };
    localStorage.setItem("sne_quiz_state_v1", JSON.stringify(payload));
  }, [order, index, scoreMap, incorrectIds]);

  const current = QUESTIONS.find((q) => q.id === order[index]);

  function handleSelect(i) {
    if (showAnswer) return;
    setSelected(i);
    setShowAnswer(true);
    const correct = i === current.answerIndex;
    setScoreMap((m) => ({ ...m, [current.id]: correct }));
    setIncorrectIds((arr) => {
      const exists = arr.includes(current.id);
      if (!correct && !exists) return [...arr, current.id];
      if (correct && exists) return arr.filter((id) => id !== current.id);
      return arr;
    });
  }

  function nextQuestion() {
    setSelected(null);
    setShowAnswer(false);
    setIndex((i) => Math.min(i + 1, order.length - 1));
  }

  function prevQuestion() {
    setSelected(null);
    setShowAnswer(false);
    setIndex((i) => Math.max(i - 1, 0));
  }

  function shuffleQuestions() {
    const ids = QUESTIONS.map((q) => q.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setOrder(ids);
    setIndex(0);
    setSelected(null);
    setShowAnswer(false);
  }

  function reviewIncorrect() {
    if (incorrectIds.length === 0) return;
    setOrder(incorrectIds.slice());
    setIndex(0);
    setSelected(null);
    setShowAnswer(false);
  }

  function resetProgress() {
    if (!confirm("本当に進捗をリセットしますか？ 保存された学習履歴が消えます。")) return;
    localStorage.removeItem("sne_quiz_state_v1");
    setOrder(QUESTIONS.map((q) => q.id));
    setIndex(0);
    setScoreMap({});
    setIncorrectIds([]);
    setSelected(null);
    setShowAnswer(false);
  }

  function exportCSV() {
    const rows = [
      ["id", "question", "choice_0", "choice_1", "choice_2", "choice_3", "answer_index", "explanation"],
    ];
    for (const q of QUESTIONS) {
      rows.push([q.id, q.question, ...q.choices, q.answerIndex, q.explanation]);
    }
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "special_needs_quiz_questions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const progress = Math.round(((index + 1) / order.length) * 100);
  const totalCorrect = Object.values(scoreMap).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-4 sm:p-6">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">特別支援教育総論（予想問題）</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">1問ずつ学べるクイズアプリ — スマホに最適化</p>
          </div>
          <div className="text-right text-sm">
            <div className="text-slate-600">{index + 1} / {order.length}</div>
            <div className="text-slate-400 text-xs">正答数: {totalCorrect}</div>
          </div>
        </header>

        <div className="mt-4">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="h-2 rounded-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <main className="mt-4">
          <article aria-live="polite">
            <h2 className="text-sm text-slate-500">{current.title}</h2>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-3"
            >
              <p className="text-base sm:text-lg leading-relaxed">{current.question}</p>

              <div className="mt-4 grid gap-3">
                {current.choices.map((c, i) => {
                  const isSelected = selected === i;
                  const isCorrect = showAnswer && i === current.answerIndex;
                  const isWrong = showAnswer && isSelected && i !== current.answerIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`text-left p-3 rounded-lg border transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-300
                        ${isCorrect ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"}
                        ${isWrong ? "border-rose-300 bg-rose-50" : ""}
                      `}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-[34px] flex items-center justify-center font-medium text-sm text-slate-700">{String.fromCharCode(65 + i)}</div>
                        <div className="flex-1">
                          <div className="text-sm sm:text-base">{c}</div>
                          {isCorrect && (
                            <div className="mt-1 text-xs text-emerald-700">正解</div>
                          )}
                          {isWrong && (
                            <div className="mt-1 text-xs text-rose-700">不正解</div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showAnswer && (
                  <motion.section
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 p-3 bg-slate-50 border rounded-lg text-sm"
                  >
                    <div className="font-medium">解答:</div>
                    <div className="mt-1">{String.fromCharCode(65 + current.answerIndex)}. {current.choices[current.answerIndex]}</div>
                    <div className="mt-2 text-slate-600">{current.explanation}</div>
                  </motion.section>
                )}
              </AnimatePresence>

            </motion.div>
          </article>

          <nav className="mt-5 flex items-center justify-between gap-3">
            <button onClick={prevQuestion} className="flex-1 py-2 px-3 rounded-lg border bg-white text-sm shadow-sm disabled:opacity-50" disabled={index === 0}>
              前へ
            </button>
            <button onClick={nextQuestion} className="flex-1 py-2 px-3 rounded-lg bg-emerald-500 text-white text-sm shadow-sm">
              次へ
            </button>
          </nav>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={shuffleQuestions} className="py-2 px-3 rounded-lg border bg-white text-sm">シャッフル</button>
            <button onClick={() => { setOrder(QUESTIONS.map((q) => q.id)); setIndex(0); }} className="py-2 px-3 rounded-lg border bg-white text-sm">順序を戻す</button>
            <button onClick={reviewIncorrect} className="py-2 px-3 rounded-lg border bg-white text-sm" disabled={incorrectIds.length===0}>不正解のみ復習</button>
            <button onClick={resetProgress} className="py-2 px-3 rounded-lg border bg-white text-sm">進捗リセット</button>
            <button onClick={exportCSV} className="py-2 px-3 rounded-lg border bg-white text-sm">CSV出力</button>
          </div>

          <footer className="mt-6 text-xs text-slate-400">
            ヒント: 選択肢をタップすると解答と解説が表示されます。学習が終わったら「進捗リセット」でやり直せます。
          </footer>

        </main>
      </div>
    </div>
  );
}
