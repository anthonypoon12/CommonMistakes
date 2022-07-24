var traditional;
$(document).ready(function () {
  if (localStorage.getItem("Simplifed") == "true") {
    traditional = false;
    $(".btn-convert").text("Simplifed");
  } else {
    traditional = true;
    $(".btn-convert").text("Traditional");
  }

  //trad <-> simp conversion on click
  $(".btn-convert").click(function () {
    if (traditional) {
      $(".btn-convert").text("Simplifed");
      localStorage.setItem("Simplifed", "true");
      $(".traditional").hide();
      $(".simplified").show();
    } else {
      $(".btn-convert").text("Traditional");
      localStorage.setItem("Simplifed", "false");
      $(".traditional").show();
      $(".simplified").hide();
    }
    traditional = !traditional;
  });
});

var writer;
//render chinese stroke animation in modal
function createHanziWriter(index, modalTrad) {
  $("#character-target-div").empty();
  if (modalTrad) chinese = dict[index].Tradchar[0];
  else chinese = dict[index].Simpchar[0];
  $(".character-target-div").empty();
  writer = HanziWriter.create("character-target-div", chinese, {
    width: 150,
    height: 150,
    padding: 5,
    showOutline: true,
    delayBetweenStrokes: 500,
    strokeColor: "#7f36b5",
  });
}

function showAnimation() {
  writer.animateCharacter();
}

/**
 * creates Radical and Other component contents
 * section = string that is equal to "radical" or "component"
 * index = box's id
 * modalTrad = bool. True if traditional
 */
function createRadicalorComponent(section, index, modalTrad) {
  $(`#${section}`).empty();
  var info;
  if (section == "radical") {
    if (modalTrad) {
      info = dict[index]["TradRad"];
    } else info = dict[index]["SimpRad"];
  } else if (section == "component") {
    if (modalTrad) {
      info = dict[index]["TradOther"];
    } else info = dict[index]["SimpOther"];
  }

  if (info == "") $(`#${section}`).html("N/A");
  else {
    info = info.split(",");
    var contents = `<div>
      <div class='font_kai radCompChar'>${info[0][0]}</span></div>
      <div class='radCompEnglish'>${PinyinConverter.convert(
        info[0].substr(1, info[0].length - 1)
      )}</div>
      <div class='radCompEnglish'>${info[1]}</div>
    </div>`;
    $(`#${section}`).html(contents);
  }
}

/**
 * create word examples
 * freq = frequency of clicked character
 * currentEx = index of current character example
 * modalTrad is a bool. True if traditonal chinese.
 */
function createWordExample(freq, currentEx, modalTrad) {
  var chinExample;
  var exampleDict = wordEx[freq][currentEx];
  if (modalTrad) chinExample = exampleDict.Trad;
  else chinExample = exampleDict.Simp;
  var example = `<div class="chinWordEx" data-ex="${currentEx}">`;
  for (let i in exampleDict.Simp) {
    example += `
    <div>
      <div class="chinExampleChar font_kai">${chinExample[i]}</div>
      <div class="chinExampleEnglish">${PinyinConverter.convert(
        exampleDict.Pinyin[i]
      )}</div>
      <div class="chinExampleEnglish">${exampleDict.English[i]}</div>
    </div>
    `;

    if (i < exampleDict.Simp.length - 1) {
      example += `
      <div>
        <div class="chinExampleSymbol"> + </div>
        <div></div>
        <div></div>
      </div>
      `;
    }
  }

  example += `
  <div>
    <div class="chinExampleSymbol"> = </div>
    <div></div>
    <div></div>
  </div>
  `;

  example += `<div><div style="display: flex">`;
  for (let i in exampleDict.Simp) {
    example += `
      <div>
      <div class="chinExampleChar font_kai">${chinExample[i]}</div>
      <div class="chinExampleEnglish">${PinyinConverter.convert(
        exampleDict.Pinyin[i]
      )}</div>
      </div>
      `;
  }
  example += `</div><div class="chinExampleEnglish">${exampleDict.Meaning}</div></div></div>`;

  $("#chineseWordEx").append(example);
}

//create Sent examples
function createSentExample(freq, currentEx, modalTrad) {
  var sentExample;
  var exampleDict = sentEx[freq][currentEx];
  if (modalTrad) chinExample = exampleDict.TradSentence;
  else chinExample = exampleDict.SimpSentence;
  var example = `<div class="chinSentEx" data-ex="${currentEx}">
                    <div class="sentCharacters font_kai" data-sent="${currentEx}">${chinExample}</div>
                    <div class="sentPinyin" data-sent="${currentEx}">${PinyinConverter.convert(
    exampleDict.Pinyin
  )}</div>
                    <div class="sentEnglish">${exampleDict.English}</div>
                  </div>`;
  $("#chineseSentEx").append(example);
  $(".sentPinyin").hide();
}
