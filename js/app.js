(function () {
  "use strict";

  var OCCASIONS = [
    {
      id: "eid", label: "عيد", emoji: "🌙", color: "#0f5c4e",
      templates: [
        "كل عام وأنت بخير يا {to}، أعاده الله عليك بالخير واليمن والبركات، وجعل أيامك فرحًا وسرورًا. من {from}.",
        "عيدك مبارك يا {to}، تقبّل الله منك الصيام والقيام، وأسعد قلبك بكل ما تتمنى. مع أطيب التحيات، {from}.",
        "يا {to}، عيد سعيد عليك وعلى من تحب، وكل عام وأنت إلى الخير أقرب. تهنئة صادقة من {from}."
      ]
    },
    {
      id: "grad", label: "تخرّج", emoji: "🎓", color: "#1d4e89",
      templates: [
        "ألف مبروك التخرّج يا {to}، تعبك أثمر ووصلت إلى ما تستحق. فخور بك، {from}.",
        "يا {to}، مبروك الشهادة والبداية الجديدة، بالتوفيق في كل خطوة قادمة. من {from}.",
        "تخرّجت يا {to}! فرحتي بك أكبر من الكلمات، وأسأل الله أن يفتح لك أبواب الخير. {from}."
      ]
    },
    {
      id: "wed", label: "زواج", emoji: "💍", color: "#a63d63",
      templates: [
        "يا {to}، مبارك الزواج، أسأل الله أن يجمع بينكما على خير ويرزقكما السعادة والذرية الصالحة. من {from}.",
        "ألف مبروك يا {to}، بيت عامر بالحب والرحمة، وبداية عمر جميل مع شريك العمر. {from}.",
        "تهانينا القلبية يا {to} بمناسبة الزواج، عسى أيامكما كلها فرح ووئام. {from}."
      ]
    },
    {
      id: "baby", label: "مولود جديد", emoji: "🍼", color: "#2f7d8a",
      templates: [
        "مبارك المولود الجديد يا {to}، جعله الله قدمًا صالحة وقرّة عين لكما. من {from}.",
        "يا {to}، ألف مبروك القدوم الجديد، نسأل الله أن ينبته نباتًا حسنًا ويحفظه. {from}.",
        "أجمل التهاني يا {to} بوصول الصغير، وبيتكم عامر بالفرح. {from}."
      ]
    },
    {
      id: "heal", label: "شفاء", emoji: "🌿", color: "#4b7a3a",
      templates: [
        "طهور إن شاء الله يا {to}، شفاء عاجل لا يترك أثرًا، وعودة سريعة إلى صحتك. من {from}.",
        "يا {to}، أسأل الله أن يلبسك ثوب العافية وأن يجعل كل ألم في ميزان حسناتك. {from}.",
        "قلبي معك يا {to}، لا بأس طهور إن شاء الله، وستعود أقوى. {from}."
      ]
    },
    {
      id: "thanks", label: "شكر", emoji: "🤝", color: "#8a5a2b",
      templates: [
        "شكرًا من القلب يا {to}، كلمة قليلة في حق معروفك، والله لا ينسى جميل صنعك. {from}.",
        "يا {to}، حضورك ودعمك يعنيان لي كثيرًا، فشكرًا على كل شيء. {from}.",
        "تقديري لك يا {to} على ما قدمته لي، أسأل الله أن يجزيك خير الجزاء. {from}."
      ]
    },
    {
      id: "morning", label: "صباح الخير", emoji: "☀️", color: "#c9922f",
      templates: [
        "صباح الخير يا {to}، أتمنى لك يومًا هادئًا مليئًا بالأخبار الجميلة. {from}.",
        "صباحك سعيد يا {to}، رزقك الله راحة القلب وسعة الرزق. {from}.",
        "يا {to}، صباح جديد وفرصة جديدة، وفقك الله في كل خطوة اليوم. {from}."
      ]
    },
    {
      id: "luck", label: "توفيق", emoji: "✨", color: "#5b4bb7",
      templates: [
        "بالتوفيق يا {to} في خطوتك الجديدة، أسأل الله أن يوفقك وييسّر لك أمرك. {from}.",
        "يا {to}، نجاحك قريب، ثق بنفسك وبالله، وبالتوفيق دائمًا. {from}.",
        "أمنياتي لك بالتوفيق يا {to} في كل ما تبدأه، وتيسير من الله في كل خطوة. {from}."
      ]
    }
  ];

  var PLACEHOLDER = "اكتب الاسم واضغط «كوّن الرسالة» ليظهر نصّ رسالتك هنا.";

  var el = {
    form: document.getElementById("msgForm"),
    to: document.getElementById("to"),
    from: document.getElementById("from"),
    occasion: document.getElementById("occasion"),
    toError: document.getElementById("toError"),
    card: document.getElementById("card"),
    cardText: document.getElementById("cardText"),
    cardBadge: document.getElementById("cardBadge"),
    copyBtn: document.getElementById("copyBtn"),
    waBtn: document.getElementById("waBtn"),
    shareBtn: document.getElementById("shareBtn"),
    shuffleBtn: document.getElementById("shuffleBtn"),
    grid: document.getElementById("occasionGrid"),
    toast: document.getElementById("toast")
  };

  var state = {
    occasionId: OCCASIONS[0].id,
    templateIndex: 0,
    text: ""
  };

  function byId(id) {
    for (var i = 0; i < OCCASIONS.length; i++) {
      if (OCCASIONS[i].id === id) return OCCASIONS[i];
    }
    return OCCASIONS[0];
  }

  function compose(occasion, template, toName, fromName) {
    return template
      .replace(/\{to\}/g, toName)
      .replace(/\{from\}/g, fromName || "محبّك");
  }

  function currentTemplate(occasion) {
    return occasion.templates[state.templateIndex % occasion.templates.length];
  }

  var toastTimer = null;
  function showToast(message, isError) {
    el.toast.textContent = message;
    el.toast.classList.toggle("is-error", Boolean(isError));
    el.toast.classList.add("is-visible");
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      el.toast.classList.remove("is-visible");
    }, 2600);
  }

  function setActionsEnabled(enabled) {
    el.copyBtn.disabled = !enabled;
    el.waBtn.disabled = !enabled;
    if (el.shareBtn) el.shareBtn.disabled = !enabled;
  }

  function paintOccasion(occasion) {
    el.card.style.setProperty("--oc", occasion.color);
    el.cardBadge.textContent = occasion.emoji + " " + occasion.label;
  }

  function showError(message) {
    el.toError.textContent = message;
    el.toError.hidden = false;
    el.to.setAttribute("aria-invalid", "true");
  }

  function clearError() {
    el.toError.hidden = true;
    el.to.removeAttribute("aria-invalid");
  }

  function validate() {
    var name = el.to.value.trim();
    if (name.length < 2) {
      showError("اكتب اسمًا من حرفين على الأقل.");
      el.to.focus();
      return false;
    }
    clearError();
    return true;
  }

  function renderMessage(animate) {
    var occasion = byId(state.occasionId);
    var text = compose(
      occasion,
      currentTemplate(occasion),
      el.to.value.trim(),
      el.from.value.trim()
    );
    state.text = text;
    el.cardText.textContent = text;
    el.cardText.classList.remove("is-placeholder");
    paintOccasion(occasion);
    setActionsEnabled(true);
    if (animate) {
      el.cardText.animate(
        [
          { opacity: 0, transform: "translateY(6px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 260, easing: "ease-out" }
      );
    }
  }

  function selectOccasion(id, scrollToMaker, keepTemplate) {
    state.occasionId = id;
    if (!keepTemplate) state.templateIndex = 0;
    el.occasion.value = id;
    var chips = el.grid.querySelectorAll(".chip");
    for (var i = 0; i < chips.length; i++) {
      chips[i].classList.toggle("is-active", chips[i].getAttribute("data-id") === id);
    }
    if (state.text) {
      renderMessage(true);
    } else {
      paintOccasion(byId(id));
    }
    if (scrollToMaker) {
      document.getElementById("make").scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(function () { el.to.focus({ preventScroll: true }); }, 420);
    }
  }

  // fill the select
  OCCASIONS.forEach(function (occasion) {
    var option = document.createElement("option");
    option.value = occasion.id;
    option.textContent = occasion.emoji + " " + occasion.label;
    el.occasion.appendChild(option);
  });
  el.occasion.value = state.occasionId;

  // build the chips
  OCCASIONS.forEach(function (occasion) {
    var chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.setAttribute("data-id", occasion.id);

    var emoji = document.createElement("span");
    emoji.className = "chip__emoji";
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = occasion.emoji;

    var label = document.createElement("span");
    label.textContent = occasion.label;

    chip.appendChild(emoji);
    chip.appendChild(label);
    chip.addEventListener("click", function () {
      selectOccasion(occasion.id, true);
    });
    el.grid.appendChild(chip);
  });

  // read the URL: index.html?occasion=eid&t=2
  function readUrlState() {
    var params = new URLSearchParams(window.location.search);
    var wanted = params.get("occasion");
    if (wanted) {
      for (var i = 0; i < OCCASIONS.length; i++) {
        if (OCCASIONS[i].id === wanted) {
          state.occasionId = wanted;
          break;
        }
      }
    }
    var t = parseInt(params.get("t"), 10);
    if (!isNaN(t) && t >= 0) {
      state.templateIndex = t;
    }
  }
  // initial paint: read the link first, then paint the matching occasion
  readUrlState();
  selectOccasion(state.occasionId, false, true);
  setActionsEnabled(false);
  if (!navigator.share) el.shareBtn.hidden = true;

  // events
  el.form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validate()) return;
    state.templateIndex = 0;
    renderMessage(true);
    showToast("رسالتك جاهزة");
  });

  el.shuffleBtn.addEventListener("click", function () {
    if (!validate()) return;
    state.templateIndex = state.templateIndex + 1;
    renderMessage(true);
    showToast("قالب جديد");
  });

  el.occasion.addEventListener("change", function () {
    selectOccasion(el.occasion.value, false);
  });

  el.to.addEventListener("input", function () {
    if (el.to.value.trim().length >= 2) clearError();
    if (state.text && el.to.value.trim().length >= 2) renderMessage(false);
  });

  el.from.addEventListener("input", function () {
    if (state.text) renderMessage(false);
  });

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return legacyCopy(text); }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (error) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  el.copyBtn.addEventListener("click", function () {
    if (!state.text) return;
    copyText(state.text).then(function (ok) {
      showToast(ok ? "تم نسخ الرسالة" : "تعذّر النسخ، حدّد النص يدويًا", !ok);
    });
  });

  el.waBtn.addEventListener("click", function () {
    if (!state.text) return;
    var url = "https://wa.me/?text=" + encodeURIComponent(state.text);
    window.open(url, "_blank", "noopener");
  });

  el.shareBtn.addEventListener("click", function () {
    if (!state.text) return;
    navigator.share({ text: state.text }).catch(function () {
      /* the user closed the share sheet: nothing to do */
    });
  });

  el.cardText.addEventListener("click", function () {
    if (!state.text) return;
    var selection = window.getSelection();
    if (!selection) return;
    var range = document.createRange();
    range.selectNodeContents(el.cardText);
    selection.removeAllRanges();
    selection.addRange(range);
  });
})();