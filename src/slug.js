let _ = require('underscore');
let slugCharMap = {};

// normalizes a slug based on a char mapping
// removes not specified characters
// example:
//   a_url_with_ä becomes a-url-with-ae
var slug = {
  normalize: function (slug) {
    if (!slug) {
      return '';
    }

    slug = slug
      .toLowerCase()
      .trim()
      // replace whitespace(s) with one dash
      .replace(/[\s]+/g, '-');

    // map slug by charMap and allowed characters | remove if char is not allowed
    slug = _.map(slug, function (char) {
      if (slugCharMap[char] != null) {
        return slugCharMap[char];
      }
      if (char.match(/[a-z0-9\-]/)) {
        return char;
      }
      return '';
    }
    ).join('');

    // replace multiple dashes with one
    slug = slug.replace(/[-]+/g, '-');

    return slug;
  },
  generate: function (catchline, title) {
    const normalizedCatchline = this.normalize(catchline);
    const normalizedTitle = this.normalize(title);

    return _.filter([normalizedCatchline, normalizedTitle]).join('-');
  }
};

export default slug;

slugCharMap = {
  'à': 'a',
  'á': 'a',
  'â': 'a',
  'ã': 'a',
  'ä': 'ae',
  'å': 'a',
  'æ': 'ae',
  'ā': 'a',
  'ç': 'c',
  'è': 'e',
  'é': 'e',
  'ê': 'e',
  'ë': 'e',
  'ē': 'e',
  'ì': 'i',
  'í': 'i',
  'î': 'i',
  'ï': 'i',
  'ī': 'i',
  'ñ': 'n',
  'ò': 'o',
  'ó': 'o',
  'ô': 'o',
  'õ': 'o',
  'ö': 'oe',
  'ø': 'o',
  'ō': 'o',
  'œ': 'oe',
  'ù': 'u',
  'ú': 'u',
  'û': 'u',
  'ũ': 'u',
  'ü': 'ue',
  'ū': 'u',
  'ý': 'y',
  'ÿ': 'ye',
  'š': 's',
  'ß': 'ss',
  '—': '-',
  '_': '-'
};
