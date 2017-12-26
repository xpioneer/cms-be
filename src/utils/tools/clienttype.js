
const getClientType = u => {
  if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    return {type:'iOS', version: u.match(/iP[^;]+; CPU[^\d]+[\d+(_|\.)]+/)[0]};
  } else if (u.match(/Android/)) {
    return {type: 'Android', version: u.match(/Android ([\d.]+)/)[0]};
  } else if (u.match(/Trident/)) {
    return {type: 'IE', version: u.match(/(MSIE ([\d.]+))|(Trident\/[\d.]+)/)[0]};
  } else if (u.match(/Edge/)) {
    return {type: 'Edge', version: u.match(/Edge\/([\d.]+)/)[0]};
  } else if (u.match(/Chrome/)) {
    return {type: 'Chrome', version: u.match(/Chrome\/([\d.]+)/)[0]};
  } else if (u.match(/Firefox/)) {
    return {type: 'Firefox', version: u.match(/Firefox\/([\d.]+)/)[0]};
  } else if (u.match(/Safari/)) {
    return {type: 'Safari', version: u.match(/Safari\//)[0] + u.match(/Version\/([\d.]+)/)[1]};
  } else {
    return {type: u, version: null};
  }
};

export default getClientType;
