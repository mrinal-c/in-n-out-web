export const addQueryParams = (url, params) => {
    var str = "";
    for (const [key, value] of Object.entries(params)) {
      str += key + "=" + value + "&";
    }
    str = str.substring(0, str.length - 1);
    url += "?" + str;
    return url;
  };