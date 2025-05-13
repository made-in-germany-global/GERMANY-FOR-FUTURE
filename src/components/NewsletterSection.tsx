import React, { useState } from 'react';
import { ChevronDown, Mail } from 'lucide-react';

const translations = {
  de: {
    heading: "Newsletter Anmeldung!",
    subheading: "Bleiben Sie über 'MADE IN GERMANY © ' auf dem Laufenden!",
    emailPlaceholder: "Geben Sie Ihre E-Mail ein",
    countryPlaceholder: "Wählen Sie Ihr Land aus",
    countries: [
      { code: "ng", name: "Nigeria" },
      { code: "za", name: "Südafrika" },
      { code: "ke", name: "Kenia" },
      { code: "eg", name: "Ägypten" },
      { code: "ma", name: "Marokko" },
      { code: "gh", name: "Ghana" },
      { code: "dz", name: "Algerien" },
      { code: "tn", name: "Tunesien" },
      { code: "ao", name: "Angola" },
      { code: "sa", name: "Saudi-Arabien" },
      { code: "ae", name: "VAE" },
      { code: "qa", name: "Katar" },
      { code: "kw", name: "Kuwait" },
      { code: "bh", name: "Bahrain" },
      { code: "om", name: "Oman" },
      { code: "cn", name: "China" },
      { code: "in", name: "Indien" },
      { code: "jp", name: "Japan" },
      { code: "kr", name: "Südkorea" },
      { code: "ph", name: "Philippinen" },
      { code: "th", name: "Thailand" },
      { code: "vn", name: "Vietnam" },
      { code: "id", name: "Indonesien" },
      { code: "sg", name: "Singapur" },
      { code: "hk", name: "Hongkong" },
      { code: "tw", name: "Taiwan" },
    ],
    interestsPlaceholder: "Ich bin speziell an folgenden Themen interessiert",
    interests: [
      { code: "quality", name: "Deutsche Qualität" },
      { code: "exports", name: "Exportprodukte" },
      { code: "innovation", name: "Innovationen" },
    ],
    subscriptionOptions: [
      "Ja, ich möchte E-Mails erhalten.",
      "Nein, danke.",
      "Ich habe die Datenschutzrichtlinie gelesen.",
    ],
    submitButton: "Schließe dich uns an",
  },
  en: {
    heading: "Newsletter Signup!",
    subheading: "Stay updated on 'MADE IN GERMANY © '!",
    emailPlaceholder: "Enter your email",
    countryPlaceholder: "Select your country",
    countries: [
      { code: "ng", name: "Nigeria" },
      { code: "za", name: "South Africa" },
      { code: "ke", name: "Kenya" },
      { code: "eg", name: "Egypt" },
      { code: "ma", name: "Morocco" },
      { code: "gh", name: "Ghana" },
      { code: "dz", name: "Algeria" },
      { code: "tn", name: "Tunisia" },
      { code: "ao", name: "Angola" },
      { code: "sa", name: "Saudi Arabia" },
      { code: "ae", name: "UAE" },
      { code: "qa", name: "Qatar" },
      { code: "kw", name: "Kuwait" },
      { code: "bh", name: "Bahrain" },
      { code: "om", name: "Oman" },
      { code: "cn", name: "China" },
      { code: "in", name: "India" },
      { code: "jp", name: "Japan" },
      { code: "kr", name: "South Korea" },
      { code: "ph", name: "Philippines" },
      { code: "th", name: "Thailand" },
      { code: "vn", name: "Vietnam" },
      { code: "id", name: "Indonesia" },
      { code: "sg", name: "Singapore" },
      { code: "hk", name: "Hong Kong" },
      { code: "tw", name: "Taiwan" },
    ],
    interestsPlaceholder: "I am specifically interested in the following topics",
    interests: [
      { code: "quality", name: "German Quality" },
      { code: "exports", name: "Export Products" },
      { code: "innovation", name: "Innovations" },
    ],
    subscriptionOptions: [
      "Yes, I would like to receive emails.",
      "No, thank you.",
      "I have read the privacy policy.",
    ],
    submitButton: "Join us",
  },
  es: {
    heading: "¡Suscripción al boletín!",
    subheading: "¡Mantente al día con 'MADE IN GERMANY © '!",
    emailPlaceholder: "Ingresa tu correo electrónico",
    countryPlaceholder: "Selecciona tu país",
    countries: [
      { code: "ng", name: "Nigeria" },
      { code: "za", name: "Sudáfrica" },
      { code: "ke", name: "Kenia" },
      { code: "eg", name: "Egipto" },
      { code: "ma", name: "Marruecos" },
      { code: "gh", name: "Ghana" },
      { code: "dz", name: "Argelia" },
      { code: "tn", name: "Túnez" },
      { code: "ao", name: "Angola" },
      { code: "sa", name: "Arabia Saudita" },
      { code: "ae", name: "EAU" },
      { code: "qa", name: "Catar" },
      { code: "kw", name: "Kuwait" },
      { code: "bh", name: "Baréin" },
      { code: "om", name: "Omán" },
      { code: "cn", name: "China" },
      { code: "in", name: "India" },
      { code: "jp", name: "Japón" },
      { code: "kr", name: "Corea del Sur" },
      { code: "ph", name: "Filipinas" },
      { code: "th", name: "Tailandia" },
      { code: "vn", name: "Vietnam" },
      { code: "id", name: "Indonesia" },
      { code: "sg", name: "Singapur" },
      { code: "hk", name: "Hong Kong" },
      { code: "tw", name: "Taiwán" },
    ],
    interestsPlaceholder: "Estoy especialmente interesado en los siguientes temas",
    interests: [
      { code: "quality", name: "Calidad Alemana" },
      { code: "exports", name: "Productos de Exportación" },
      { code: "innovation", name: "Innovaciones" },
    ],
    subscriptionOptions: [
      "Sí, quiero recibir correos electrónicos.",
      "No, gracias.",
      "He leído la política de privacidad.",
    ],
    submitButton: "Únete a nosotros",
  },
  fr: {
    heading: "Inscription à la newsletter !",
    subheading: "Restez informé sur 'MADE IN GERMANY © ' !",
    emailPlaceholder: "Entrez votre email",
    countryPlaceholder: "Sélectionnez votre pays",
    countries: [
      { code: "ng", name: "Nigeria" },
      { code: "za", name: "Afrique du Sud" },
      { code: "ke", name: "Kenya" },
      { code: "eg", name: "Égypte" },
      { code: "ma", name: "Maroc" },
      { code: "gh", name: "Ghana" },
      { code: "dz", name: "Algérie" },
      { code: "tn", name: "Tunisie" },
      { code: "ao", name: "Angola" },
      { code: "sa", name: "Arabie Saoudite" },
      { code: "ae", name: "Émirats Arabes Unis" },
      { code: "qa", name: "Qatar" },
      { code: "kw", name: "Koweït" },
      { code: "bh", name: "Bahreïn" },
      { code: "om", name: "Oman" },
      { code: "cn", name: "Chine" },
      { code: "in", name: "Inde" },
      { code: "jp", name: "Japon" },
      { code: "kr", name: "Corée du Sud" },
      { code: "ph", name: "Philippines" },
      { code: "th", name: "Thaïlande" },
      { code: "vn", name: "Vietnam" },
      { code: "id", name: "Indonésie" },
      { code: "sg", name: "Singapour" },
      { code: "hk", name: "Hong Kong" },
      { code: "tw", name: "Taïwan" },
    ],
    interestsPlaceholder: "Je suis particulièrement intéressé par les sujets suivants",
    interests: [
      { code: "quality", name: "Qualité Allemande" },
      { code: "exports", name: "Produits d'Exportation" },
      { code: "innovation", name: "Innovations" },
    ],
    subscriptionOptions: [
      "Oui, je souhaite recevoir des emails.",
      "Non, merci.",
      "J'ai lu la politique de confidentialité.",
    ],
    submitButton: "Rejoignez-nous",
  },
  it: {
    heading: "Iscrizione alla newsletter!",
    subheading: "Rimani aggiornato su 'MADE IN GERMANY © '!",
    emailPlaceholder: "Inserisci la tua email",
    countryPlaceholder: "Seleziona il tuo paese",
    countries: [
      { code: "ng", name: "Nigeria" },
      { code: "za", name: "Sudafrica" },
      { code: "ke", name: "Kenya" },
      { code: "eg", name: "Egitto" },
      { code: "ma", name: "Marocco" },
      { code: "gh", name: "Ghana" },
      { code: "dz", name: "Algeria" },
      { code: "tn", name: "Tunisia" },
      { code: "ao", name: "Angola" },
      { code: "sa", name: "Arabia Saudita" },
      { code: "ae", name: "Emirati Arabi Uniti" },
      { code: "qa", name: "Qatar" },
      { code: "kw", name: "Kuwait" },
      { code: "bh", name: "Bahrein" },
      { code: "om", name: "Oman" },
      { code: "cn", name: "Cina" },
      { code: "in", name: "India" },
      { code: "jp", name: "Giappone" },
      { code: "kr", name: "Corea del Sud" },
      { code: "ph", name: "Filippine" },
      { code: "th", name: "Thailandia" },
      { code: "vn", name: "Vietnam" },
      { code: "id", name: "Indonesia" },
      { code: "sg", name: "Singapore" },
      { code: "hk", name: "Hong Kong" },
      { code: "tw", name: "Taiwan" },
    ],
    interestsPlaceholder: "Sono particolarmente interessato ai seguenti argomenti",
    interests: [
      { code: "quality", name: "Qualità Tedesca" },
      { code: "exports", name: "Prodotti di Esportazione" },
      { code: "innovation", name: "Innovazioni" },
    ],
    subscriptionOptions: [
      "Sì, voglio ricevere email.",
      "No, grazie.",
      "Ho letto l'informativa sulla privacy.",
    ],
    submitButton: "Unisciti a noi",
  },
  nl: {
    heading: "Nieuwsbrief Aanmelding!",
    subheading: "Blijf op de hoogte van 'MADE IN GERMANY © '!",
    emailPlaceholder: "Voer je e-mail in",
    countryPlaceholder: "Kies je land",
    countries: [
      { code: "ng", name: "Nigeria" },
      { code: "za", name: "Zuid-Afrika" },
      { code: "ke", name: "Kenia" },
      { code: "eg", name: "Egypte" },
      { code: "ma", name: "Marokko" },
      { code: "gh", name: "Ghana" },
      { code: "dz", name: "Algerije" },
      { code: "tn", name: "Tunesië" },
      { code: "ao", name: "Angola" },
      { code: "sa", name: "Saoedi-Arabië" },
      { code: "ae", name: "VAE" },
      { code: "qa", name: "Qatar" },
      { code: "kw", name: "Koeweit" },
      { code: "bh", name: "Bahrein" },
      { code: "om", name: "Oman" },
      { code: "cn", name: "China" },
      { code: "in", name: "India" },
      { code: "jp", name: "Japan" },
      { code: "kr", name: "Zuid-Korea" },
      { code: "ph", name: "Filipijnen" },
      { code: "th", name: "Thailand" },
      { code: "vn", name: "Vietnam" },
      { code: "id", name: "Indonesië" },
      { code: "sg", name: "Singapore" },
      { code: "hk", name: "Hongkong" },
      { code: "tw", name: "Taiwan" },
    ],
    interestsPlaceholder: "Ik ben speciaal geïnteresseerd in de volgende onderwerpen",
    interests: [
      { code: "quality", name: "Duitse Kwaliteit" },
      { code: "exports", name: "Exportproducten" },
      { code: "innovation", name: "Innovaties" },
    ],
    subscriptionOptions: [
      "Ja, ik wil e-mails ontvangen.",
      "Nee, bedankt.",
      "Ik heb het privacybeleid gelezen.",
    ],
    submitButton: "Sluit je bij ons aan",
  },
  sa: {
    heading: "الاشتراك في النشرة الإخبارية!",
    subheading: "ابقَ على اطلاع بـ 'صنع في ألمانيا'!",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    countryPlaceholder: "اختر بلدك",
    countries: [
      { code: "ng", name: "نيجيريا" },
      { code: "za", name: "جنوب إفريقيا" },
      { code: "ke", name: "كينيا" },
      { code: "eg", name: "مصر" },
      { code: "ma", name: "المغرب" },
      { code: "gh", name: "غانا" },
      { code: "dz", name: "الجزائر" },
      { code: "tn", name: "تونس" },
      { code: "ao", name: "أنغولا" },
      { code: "sa", name: "المملكة العربية السعودية" },
      { code: "ae", name: "الإمارات العربية المتحدة" },
      { code: "qa", name: "قطر" },
      { code: "kw", name: "الكويت" },
      { code: "bh", name: "البحرين" },
      { code: "om", name: "عمان" },
      { code: "cn", name: "الصين" },
      { code: "in", name: "الهند" },
      { code: "jp", name: "اليابان" },
      { code: "kr", name: "كوريا الجنوبية" },
      { code: "ph", name: "الفلبين" },
      { code: "th", name: "تايلاند" },
      { code: "vn", name: "فيتنام" },
      { code: "id", name: "إندونيسيا" },
      { code: "sg", name: "سنغافورة" },
      { code: "hk", name: "هونغ كونغ" },
      { code: "tw", name: "تايوان" },
    ],
    interestsPlaceholder: "أنا مهتم بشكل خاص بالمواضيع التالية",
    interests: [
      { code: "quality", name: "الجودة الألمانية" },
      { code: "exports", name: "منتجات التصدير" },
      { code: "innovation", name: "ال:initiatives" },
    ],
    subscriptionOptions: [
      "نعم، أريد تلقي رسائل البريد الإلكتروني.",
      "لا، شكرًا.",
      "لقد قرأت سياسة الخصوصية.",
    ],
    submitButton: "انضم إلينا",
  },
  hk: {
    heading: "通訊訂閱！",
    subheading: "緊貼「德國製造」最新資訊！",
    emailPlaceholder: "輸入您的電子郵件",
    countryPlaceholder: "選擇您的國家",
    countries: [
      { code: "ng", name: "尼日利亞" },
      { code: "za", name: "南非" },
      { code: "ke", name: "肯尼亞" },
      { code: "eg", name: "埃及" },
      { code: "ma", name: "摩洛哥" },
      { code: "gh", name: "加納" },
      { code: "dz", name: "阿爾及利亞" },
      { code: "tn", name: "突尼斯" },
      { code: "ao", name: "安哥拉" },
      { code: "sa", name: "沙地阿拉伯" },
      { code: "ae", name: "阿聯酋" },
      { code: "qa", name: "卡塔爾" },
      { code: "kw", name: "科威特" },
      { code: "bh", name: "巴林" },
      { code: "om", name: "阿曼" },
      { code: "cn", name: "中國" },
      { code: "in", name: "印度" },
      { code: "jp", name: "日本" },
      { code: "kr", name: "南韓" },
      { code: "ph", name: "菲律賓" },
      { code: "th", name: "泰國" },
      { code: "vn", name: "越南" },
      { code: "id", name: "印尼" },
      { code: "sg", name: "新加坡" },
      { code: "hk", name: "香港" },
      { code: "tw", name: "台灣" },
    ],
    interestsPlaceholder: "我對以下主題特別感興趣",
    interests: [
      { code: "quality", name: "德國品質" },
      { code: "exports", name: "出口產品" },
      { code: "innovation", name: "創新" },
    ],
    subscriptionOptions: [
      "是的，我想接收電子郵件。",
      "不，謝謝。",
      "我已閱讀私隱政策。",
    ],
    submitButton: "加入我們",
  },
  sg: {
    heading: "通讯订阅！",
    subheading: "紧贴「德国制造」最新资讯！",
    emailPlaceholder: "输入您的电子邮件",
    countryPlaceholder: "选择您的国家",
    countries: [
      { code: "ng", name: "尼日利亚" },
      { code: "za", name: "南非" },
      { code: "ke", name: "肯尼亚" },
      { code: "eg", name: "埃及" },
      { code: "ma", name: "摩洛哥" },
      { code: "gh", name: "加纳" },
      { code: "dz", name: "阿尔及利亚" },
      { code: "tn", name: "突尼斯" },
      { code: "ao", name: "安哥拉" },
      { code: "sa", name: "沙特阿拉伯" },
      { code: "ae", name: "阿联酋" },
      { code: "qa", name: "卡塔尔" },
      { code: "kw", name: "科威特" },
      { code: "bh", name: "巴林" },
      { code: "om", name: "阿曼" },
      { code: "cn", name: "中国" },
      { code: "in", name: "印度" },
      { code: "jp", name: "日本" },
      { code: "kr", name: "韩国" },
      { code: "ph", name: "菲律宾" },
      { code: "th", name: "泰国" },
      { code: "vn", name: "越南" },
      { code: "id", name: "印尼" },
      { code: "sg", name: "新加坡" },
      { code: "hk", name: "香港" },
      { code: "tw", name: "台湾" },
    ],
    interestsPlaceholder: "我对以下主题特别感兴趣",
    interests: [
      { code: "quality", name: "德国品质" },
      { code: "exports", name: "出口产品" },
      { code: "innovation", name: "创新" },
    ],
    subscriptionOptions: [
      "是的，我想接收电子邮件。",
      "不，谢谢。",
      "我已阅读隐私政策。",
    ],
    submitButton: "加入我们",
  },
  za: {
    heading: "Nuusbrief Intekening!",
    subheading: "Bly op hoogte van 'MADE IN GERMANY © '!",
    emailPlaceholder: "Voer jou e-pos in",
    countryPlaceholder: "Kies jou land",
    countries: [
      { code: "ng", name: "Nigerië" },
      { code: "za", name: "Suid-Afrika" },
      { code: "ke", name: "Kenia" },
      { code: "eg", name: "Egipte" },
      { code: "ma", name: "Marokko" },
      { code: "gh", name: "Ghana" },
      { code: "dz", name: "Algerië" },
      { code: "tn", name: "Tunisië" },
      { code: "ao", name: "Angola" },
      { code: "sa", name: "Saoedi-Arabië" },
      { code: "ae", name: "VAE" },
      { code: "qa", name: "Katar" },
      { code: "kw", name: "Koeweit" },
      { code: "bh", name: "Bahrein" },
      { code: "om", name: "Oman" },
      { code: "cn", name: "China" },
      { code: "in", name: "Indië" },
      { code: "jp", name: "Japan" },
      { code: "kr", name: "Suid-Korea" },
      { code: "ph", name: "Filippyne" },
      { code: "th", name: "Thailand" },
      { code: "vn", name: "Viëtnam" },
      { code: "id", name: "Indonesië" },
      { code: "sg", name: "Singapoer" },
      { code: "hk", name: "Hongkong" },
      { code: "tw", name: "Taiwan" },
    ],
    interestsPlaceholder: "Ek is spesifiek geïnteresseerd in die volgende onderwerpe",
    interests: [
      { code: "quality", name: "Duitse Kwaliteit" },
      { code: "exports", name: "Uitvoerprodukte" },
      { code: "innovation", name: "Innovasies" },
    ],
    subscriptionOptions: [
      "Ja, ek wil e-posse ontvang.",
      "Nee, dankie.",
      "Ek het die privaatheidsbeleid gelees.",
    ],
    submitButton: "Sluit by ons aan",
  },
  kr: {
    heading: "뉴스레터 가입!",
    subheading: "'메이드 인 독일'에 대해 최신 소식을 받아보세요!",
    emailPlaceholder: "이메일을 입력하세요",
    countryPlaceholder: "국가를 선택하세요",
    countries: [
      { code: "ng", name: "나이지리아" },
      { code: "za", name: "남아프리카" },
      { code: "ke", name: "케냐" },
      { code: "eg", name: "이집트" },
      { code: "ma", name: "모로코" },
      { code: "gh", name: "가나" },
      { code: "dz", name: "알제리" },
      { code: "tn", name: "튀니지" },
      { code: "ao", name: "앙골라" },
      { code: "sa", name: "사우디아라비아" },
      { code: "ae", name: "아랍에미리트" },
      { code: "qa", name: "카타르" },
      { code: "kw", name: "쿠웨이트" },
      { code: "bh", name: "바레인" },
      { code: "om", name: "오만" },
      { code: "cn", name: "중국" },
      { code: "in", name: "인도" },
      { code: "jp", name: "일본" },
      { code: "kr", name: "한국" },
      { code: "ph", name: "필리핀" },
      { code: "th", name: "태국" },
      { code: "vn", name: "베트남" },
      { code: "id", name: "인도네시아" },
      { code: "sg", name: "싱가포르" },
      { code: "hk", name: "홍콩" },
      { code: "tw", name: "대만" },
    ],
    interestsPlaceholder: "다음 주제에 특히 관심이 있습니다",
    interests: [
      { code: "quality", name: "독일 품질" },
      { code: "exports", name: "수출 제품" },
      { code: "innovation", name: "혁신" },
    ],
    subscriptionOptions: [
      "네, 이메일을 받고 싶습니다.",
      "아니요, 괜찮습니다.",
      "개인정보 보호정책을 읽었습니다.",
    ],
    submitButton: "우리와 함께하세요",
  },
  jp: {
    heading: "ニュースレター登録！",
    subheading: "「メイド・イン・ジャーマニー」の最新情報をチェック！",
    emailPlaceholder: "メールアドレスを入力してください",
    countryPlaceholder: "国を選択してください",
    countries: [
      { code: "ng", name: "ナイジェリア" },
      { code: "za", name: "南アフリカ" },
      { code: "ke", name: "ケニア" },
      { code: "eg", name: "エジプト" },
      { code: "ma", name: "モロッコ" },
      { code: "gh", name: "ガーナ" },
      { code: "dz", name: "アルジェリア" },
      { code: "tn", name: "チュニジア" },
      { code: "ao", name: "アンゴラ" },
      { code: "sa", name: "サウジアラビア" },
      { code: "ae", name: "アラブ首長国連邦" },
      { code: "qa", name: "カタール" },
      { code: "kw", name: "クウェート" },
      { code: "bh", name: "バーレーン" },
      { code: "om", name: "オマーン" },
      { code: "cn", name: "中国" },
      { code: "in", name: "インド" },
      { code: "jp", name: "日本" },
      { code: "kr", name: "韓国" },
      { code: "ph", name: "フィリピン" },
      { code: "th", name: "タイ" },
      { code: "vn", name: "ベトナム" },
      { code: "id", name: "インドネシア" },
      { code: "sg", name: "シンガポール" },
      { code: "hk", name: "香港" },
      { code: "tw", name: "台湾" },
    ],
    interestsPlaceholder: "以下のトピックに特に興味があります",
    interests: [
      { code: "quality", name: "ドイツの品質" },
      { code: "exports", name: "輸出製品" },
      { code: "innovation", name: "イノベーション" },
    ],
    subscriptionOptions: [
      "はい、メールを受け取りたいです。",
      "いいえ、結構です。",
      "プライバシーポリシーを読みました。",
    ],
    submitButton: "私たちに参加してください",
  },
};

interface NewsletterSectionProps {
  language: string;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({ language }) => {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [interests, setInterests] = useState('');
  const [subscription, setSubscription] = useState('');

  const t = translations[language as keyof typeof translations] || translations.en; // Fallback to English
  const isRTL = language === 'sa'; // RTL for Arabic

  return (
    <div
      className={`max-w-7xl mx-auto p-8 bg-[#0B111F] rounded-[20px] mt-7 mb-7 ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 animate-slideLeft">
          <div className="bg-[#141c2f]/50 backdrop-blur-lg p-4 rounded-[20px] shadow-2xl border border-[#1a2435] h-full">
            <img
              src="/made-in-germany-newsletter.webp"
              alt={isRTL ? "مصافحة مع علم ألمانيا" : "Handshake with German Flag"}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 animate-slideRight">
          <div className="bg-[#141c2f]/50 backdrop-blur-lg p-6 rounded-[20px] shadow-2xl border border-[#1a2435] space-y-6">
            {/* Heading and Subheading */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">{t.heading}</h2>
              <p className="text-gray-300">{t.subheading}</p>
            </div>

            {/* Email Input */}
            <div className="relative group">
              <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full bg-[#1a1a1a] border border-[#1a2435] rounded-lg py-3 px-10 text-white placeholder-gray-300 focus:outline-none focus:border-[#1a2435] transition-all duration-300 hover:bg-[#1a1a1a]/80"
              />
            </div>

            {/* Country Select */}
            <div className="relative group">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-red-600 border border-[#1a2435] rounded-lg py-3 px-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-[#1a2435] transition-all duration-300 hover:bg-red-700"
              >
                <option value="">{t.countryPlaceholder}</option>
                {t.countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-white w-5 h-5 pointer-events-none`} />
            </div>

            {/* Interests Select */}
            <div className="relative group">
              <select
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full bg-yellow-500 border border-[#1a2435] rounded-lg py-3 px-4 text-black appearance-none cursor-pointer focus:outline-none focus:border-[#1a2435] transition-all duration-300 hover:bg-yellow-600"
              >
                <option value="">{t.interestsPlaceholder}</option>
                {t.interests.map((i) => (
                  <option key={i.code} value={i.code}>
                    {i.name}
                  </option>
                ))}
              </select>
              <ChevronDown className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-black w-5 h-5 pointer-events-none`} />
            </div>

            {/* Radio Buttons */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-row justify-center gap-8 mb-4">
                <label className="flex items-center space-x-3 text-white cursor-pointer hover:opacity-80 transition-opacity">
                  <input
                    type="radio"
                    name="subscription"
                    value="yes"
                    checked={subscription === 'yes'}
                    onChange={(e) => setSubscription(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>{t.subscriptionOptions[0]}</span>
                </label>
                <label className="flex items-center space-x-3 text-white cursor-pointer hover:opacity-80 transition-opacity">
                  <input
                    type="radio"
                    name="subscription"
                    value="no"
                    checked={subscription === 'no'}
                    onChange={(e) => setSubscription(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>{t.subscriptionOptions[1]}</span>
                </label>
              </div>
              <div className="flex justify-center">
                <label className="flex items-center space-x-3 text-white cursor-pointer hover:opacity-80 transition-opacity">
                  <input
                    type="radio"
                    name="subscription"
                    value="privacy"
                    checked={subscription === 'privacy'}
                    onChange={(e) => setSubscription(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>{t.subscriptionOptions[2]}</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1a2435] hover:bg-[#243048] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t.submitButton}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slideLeft {
          animation: slideLeft 1s ease-out forwards;
        }
        
        .animate-slideRight {
          animation: slideRight 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default NewsletterSection;