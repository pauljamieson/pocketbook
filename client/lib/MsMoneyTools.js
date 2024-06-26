function _getOfxHeader(data) {
  const endMarker = "<OFX>";
  const finalObj = {};
  data
    .slice(0, data.indexOf(endMarker))
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .forEach((val) => {
      const split = val.split(":");
      finalObj[split[0]] = split[1];
    });
  return { header: finalObj };
}

function _getSignOnMsg(data) {
  const text = _getClosedTag("<SIGNONMSGSRSV1>", data);
  const signOnMsg = { signonmsgsrsv1: undefined };
  const isSonrs = text.indexOf("<SONRS>") > 0;
  if (isSonrs) {
    const code = _getUnclosedTag("<CODE>", text);
    const severity = _getUnclosedTag("<SEVERITY>", text);
    const message = _getUnclosedTag("<MESSAGE>", text);
    const dtserver = _getUnclosedTag("<DTSERVER>", text);
    const language = _getUnclosedTag("<LANGUAGE>", text);
    signOnMsg.signonmsgsrsv1 = {
      sonrs: { status: { code, severity, message }, dtserver, language },
    };
  }
  return signOnMsg;
}

function _getCreditcardMsgSrsV1(data) {
  const creditcardmsgsrsv1 = {};
  if (data.indexOf("CREDITCARDMSGSRSV1") === -1) return creditcardmsgsrsv1;
  const text = _getClosedTag("CREDITCARDMSGSRSV1", data);
  const isCcstmttrnrs = text.indexOf("<CCSTMTTRNRS>") > 0;
  if (isCcstmttrnrs) {
    creditcardmsgsrsv1.trnuid = _getUnclosedTag("TRNUID", text); // Client-Assigned Transaction UID

    creditcardmsgsrsv1.status = {
      code: _getUnclosedTag("<CODE>", text),
      severity: _getUnclosedTag("<SEVERITY>", text),
      message: _getUnclosedTag("<MESSAGE>", text),
    };

    const ccstmtrsText = _getClosedTag("ccstmtrs", text);
    creditcardmsgsrsv1.ccstmtrs = {
      curdef: _getUnclosedTag("curdef", ccstmtrsText),
      ccacctfrom: {
        acctid: _getUnclosedTag(
          "acctid",
          _getClosedTag("<CCACCTFROM>", ccstmtrsText)
        ),
      },
      banktranlist: _getBankTranList(ccstmtrsText),
      ledgerbal: {
        balamt: _getUnclosedTag(
          "BALAMT",
          _getClosedTag("<LEDGERBAL>", ccstmtrsText)
        ),
        dtasof: _getUnclosedTag(
          "dtasof",
          _getClosedTag("<LEDGERBAL>", ccstmtrsText)
        ),
      },
      availbal: {
        availbal: _getUnclosedTag(
          "BALAMT",
          _getClosedTag("<availbal>", ccstmtrsText)
        ),
        dtasof: _getUnclosedTag(
          "dtasof",
          _getClosedTag("<availbal>", ccstmtrsText)
        ),
      },
    };
  }
  return creditcardmsgsrsv1;
}

function _getBankMsgSrsV1(data) {
  const bankmsgsrsv1 = {};
  if (data.indexOf("<BANKMSGSRSV1>") === -1) return bankmsgsrsv1;
  const text = _getClosedTag("BANKMSGSRSV1", data);
  const isStmttrnrs = text.indexOf("<BANKMSGSRSV1>") > -1;
  if (isStmttrnrs) {
    bankmsgsrsv1.trnuid = _getUnclosedTag("TRNUID", text); // Client-Assigned Transaction UID
    bankmsgsrsv1.status = {
      code: _getUnclosedTag("<CODE>", text),
      severity: _getUnclosedTag("<SEVERITY>", text),
      message: _getUnclosedTag("<MESSAGE>", text),
    };
    const stmttrnrsText = _getClosedTag("STMTTRNRS", text);
    bankmsgsrsv1.stmtrs = {
      curdef: _getUnclosedTag("curdef", stmttrnrsText),
      acctfrom: {
        bankid: _getUnclosedTag(
          "bankid",
          _getClosedTag("<BANKACCTFROM>", stmttrnrsText)
        ),
        acctid: _getUnclosedTag(
          "acctid",
          _getClosedTag("<BANKACCTFROM>", stmttrnrsText)
        ),
        accttype: _getUnclosedTag(
          "ACCTTYPE",
          _getClosedTag("<BANKACCTFROM>", stmttrnrsText)
        ),
      },
      banktranlist: _getBankTranList(stmttrnrsText),
      ledgerbal: {
        balamt: _getUnclosedTag(
          "BALAMT",
          _getClosedTag("<LEDGERBAL>", stmttrnrsText)
        ),
        dtasof: _getUnclosedTag(
          "dtasof",
          _getClosedTag("<LEDGERBAL>", stmttrnrsText)
        ),
      },
      availbal: {
        availbal: _getUnclosedTag(
          "BALAMT",
          _getClosedTag("<availbal>", stmttrnrsText)
        ),
        dtasof: _getUnclosedTag(
          "dtasof",
          _getClosedTag("<availbal>", stmttrnrsText)
        ),
      },
    };
  }
  return bankmsgsrsv1;
}

function _getBankTranList(data) {
  const text = _getClosedTag("banktranlist", data);
  const banktranlist = {
    dtstart: _getUnclosedTag("dtstart", text),
    dtend: _getUnclosedTag("dtend", text),
    stmttrns: _getStmttrns(text),
  };
  return banktranlist;
}

function _getStmttrns(data) {
  const stmts = [];
  let pos = data.indexOf("<STMTTRN>");

  while (pos !== 9) {
    // -1 for not found + 10 = 9
    const stmtText = data.slice(pos, data.indexOf("</STMTTRN>", pos) + 10);

    let memo = "";
    try {
      memo = _getUnclosedTag("MEMO", stmtText);
    } catch (err) {}
    let stmt = {};
    try {
      stmt = {
        trntype: _getUnclosedTag("TRNTYPE", stmtText),
        dtposted: _getUnclosedTag("DTPOSTED", stmtText),
        trnamt: _getUnclosedTag("TRNAMT", stmtText),
        fitid: _getUnclosedTag("FITID", stmtText),
        name: _getUnclosedTag("NAME", stmtText),
        memo,
      };
    } catch (err) {
      console.log(err);
    }
    stmts.push(stmt);
    pos = data.indexOf("<STMTTRN>", pos + 10) + 10;
  }
  return stmts;
}

function _getUnclosedTag(tag, text) {
  tag = _formatTag(tag);
  if (text.indexOf(tag) === -1) throw "Unclosed Tag does not exist : " + tag;
  return text.slice(
    text.indexOf(tag) + tag.length,
    text.indexOf("\n", text.indexOf(tag))
  );
}

function _getClosedTag(tag, text) {
  tag = _formatTag(tag);
  if (text.indexOf(tag) === -1) throw "Closed Tag does not exist : " + tag;
  const endMarker = tag.substr(0, 1) + "/" + tag.substr(1);
  return text.slice(
    text.indexOf(tag),
    text.indexOf(endMarker) + endMarker.length
  );
}

function _formatTag(tag) {
  if (!tag.startsWith("<")) tag = "<" + tag;
  if (!tag.endsWith(">")) tag = tag + ">";
  return tag.toUpperCase();
}

export function parseMsMoneyOFX(filedata) {
  const header = _getOfxHeader(filedata);
  const signOnMsg = _getSignOnMsg(filedata);
  const creditcardMsgSrsV1 = _getCreditcardMsgSrsV1(filedata);
  const bankMsgSrsV1 = _getBankMsgSrsV1(filedata);
  return { ...header, ...signOnMsg, ...creditcardMsgSrsV1, ...bankMsgSrsV1 };
}
