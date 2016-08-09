import chai from 'chai';
import slug from '../lib/Library.js';

const expect = chai.expect;

describe('Given a slug util', function () {

  describe('when I normalize() a slug', function () {

    it('should return all letters in lowercase', () => {
      expect(slug.normalize('a BIG string')).to.equal('a-big-string');
    });

    it('should replace several whitespaces with one dash', () => {
      expect(slug.normalize('a     string  with whitespaces'))
      .to.equal('a-string-with-whitespaces');
    });

    it('replaces whitespaces with dashes', () => {
      expect(slug.normalize('a string with whitespaces'))
      .to.equal('a-string-with-whitespaces');
    });

    it('trims strings', () => {
      expect(slug.normalize('   a-string-with-whitespaces   '))
      .to.equal('a-string-with-whitespaces');
    });

    it('reduce multiple dashes to one', () => {
      expect(slug.normalize('multiple-----dashes--are-replaced-----by-one'))
      .to.equal('multiple-dashes-are-replaced-by-one');
    });

    it('replaces underscores with dashes', () => {
      expect(slug.normalize('a_string_with_underscores'))
      .to.equal('a-string-with-underscores');
    });

    it('replaces umlaute', () => {
      expect(slug.normalize('ein öäü-iiger string auch in ÄÖÜ-GROSS'))
      .to.equal('ein-oeaeue-iiger-string-auch-in-aeoeue-gross');
    });

    it('removes all kinds of other characters', () => {
      expect(slug.normalize('weird &% strings with '))
      .to.equal('weird-strings-with-');
    });

    it('maps special characters', () => {
      expect(slug.normalize('special characters list ÀÁÂÃÄÅÆĀÇÈÉÊËĒÌÍÎÏĪÑÒÓÔÕÖØŌŒÙÚÛŨÜŪŸ àáâãäåæāçèéêëēìíîïīñòóôõöøōœùúûũüūÿ'))
      .to.equal('special-characters-list-aaaaaeaaeaceeeeeiiiiinoooooeoooeuuuuueuye-aaaaaeaaeaceeeeeiiiiinoooooeoooeuuuuueuye');
    });
  });


  describe('when I generate() a slug', function () {

    it('combines catchline and title to a slug', () => {
      let actualSlug = slug.generate('Example Catchline', 'Example Title');
      expect(actualSlug).to.equal('example-catchline-example-title');
    });

    it('ignores the title when its empty', () => {
      let actualSlug = slug.generate('Example Catchline', '');
      expect(actualSlug).to.equal('example-catchline')

      actualSlug = slug.generate('Example Catchline', undefined);
      expect(actualSlug).to.equal('example-catchline');
    });


    it('ignores the catchline when its empty', () => {
      let actualSlug = slug.generate('', 'Example Title');
      expect(actualSlug).to.equal('example-title');

      actualSlug = slug.generate(undefined, 'Example Title');
      expect(actualSlug).to.equal('example-title');
    });


    it('returns empty, when catchline and title are empty', () => {
      let actualSlug = slug.generate('', '');
      expect(actualSlug).to.equal('');

      actualSlug = slug.generate();
      expect(actualSlug).to.equal('');
    });
  });

});
