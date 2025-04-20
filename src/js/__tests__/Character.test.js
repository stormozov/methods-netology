import Character from '../Character';

describe('Character', () => {
  const throwsDict = {
    name: 'Имя должно быть строкой длиной от 2 до 10 символов.',
    type: 'Некорректный тип персонажа.',
    deadLevelUp: 'Персонаж мертв. Нельзя повысить уровень умершего персонажа.',
  };

  // Группа тестов для конструктора и валидации
  describe('Конструктор и валидация', () => {
    test('Должен создать экземпляр класса', () => {
      expect(new Character('Робин', 'Swordsman')).toBeInstanceOf(Character);
    });

    test('Должен выдать ошибку при вводе имени не в виде строки', () => {
      expect(() => new Character(123, 'Swordsman')).toThrow(throwsDict.name);
    });

    test('Должен выдать ошибку при вводе имени меньше 2 символов', () => {
      expect(() => new Character('В', 'Swordsman')).toThrow(throwsDict.name);
    });

    test('Должен выдать ошибку при вводе имени больше 10 символов', () => {
      expect(() => new Character('Максимилиан', 'Swordsman')).toThrow(throwsDict.name);
    });

    test('Должен выдать ошибку при вводе типа не в виде строки', () => {
      expect(() => new Character('Робин', 123)).toThrow(throwsDict.type);
    });

    test('Должен выдать ошибку при вводе типа, которого нет в списке', () => {
      expect(() => new Character('Робин', 'Archer')).toThrow(throwsDict.type);
    });
  });

  // Группа тестов для метода setAttributes
  describe('Метод setAttributes', () => {
    let instance;

    beforeEach(() => {
      instance = new Character('Робин', 'Swordsman');
    });

    test('Должен вернуть undefined при вызове метода', () => {
      expect(instance.setAttributes()).toBeUndefined();
    });

    test('Должен успешно установить новые значения атрибутов', () => {
      instance.setAttributes = jest.fn(() => {
        instance.level = 10;
        instance.attack = 45;
      });

      instance.setAttributes();

      expect(instance.level).toBe(10);
      expect(instance.attack).toBe(45);
    });
  });

  // Группа тестов для метода showAttributes
  describe('Метод showAttributes', () => {
    let instance;
    let consoleSpy;

    beforeEach(() => {
      instance = new Character('Робин', 'Swordsman');
      consoleSpy = jest.spyOn(console, 'log');
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('Должен вывести атрибуты в консоль', () => {
      instance.showAttributes();

      expect(consoleSpy).toHaveBeenCalledWith(
        `Имя: ${instance.name},\n` +
        `Тип: ${instance.type},\n` +
        `Здоровье: ${instance.health},\n` +
        `Уровень: ${instance.level},\n` +
        `Атака: ${instance.attack},\n` +
        `Защита: ${instance.defense}`
      );
    });
  });

  // Группа тестов для метода levelUp
  describe('Метод levelUp', () => {
    test('Должен успешно повысить уровень персонажа', () => {
      const instance = new Character('Ирвин', 'Swordsman');
      instance.attack = 10;
      instance.defense = 5;

      instance.levelUp();

      expect(instance.level).toBe(2);
      expect(instance.health).toBe(100);
      expect(instance.attack).toBe(12);
      expect(instance.defense).toBe(6);
    });

    test('Должен выдать ошибку при попытке повысить уровень мертвого персонажа', () => {
      const instance = new Character('Питер', 'Magician');
      instance.health = 0;

      expect(() => instance.levelUp()).toThrow(throwsDict.deadLevelUp);
    });
  });

  // Группа тестов для метода damage
  describe('Метод damage', () => {
    test('Должен нанести урон персонажу без защиты', () => {
      const instance = new Character('Питер', 'Magician');
      instance.damage(10);
      expect(instance.health).toBe(90);
    });

    test('Должен нанести урон персонажу с защитой', () => {
      const instance = new Character('Питер', 'Demon');
      instance.defense = 20;
      instance.damage(10);
      expect(instance.health).toBe(92);
    });

    test('Должен убить персонажа при смертельном уроне', () => {
      const instance = new Character('Ирвин', 'Swordsman');
      instance.health = 10;
      instance.damage(20);
      expect(instance.health).toBe(0);
    });

    test('Не должен изменять здоровье при нулевом уроне', () => {
      const instance = new Character('Питер', 'Demon');
      instance.damage(0);
      expect(instance.health).toBe(100);
    });

    test('Не должен изменять здоровье при отрицательном уроне', () => {
      const instance = new Character('Питер', 'Demon');
      instance.damage(-30);
      expect(instance.health).toBe(100);
    });
  });
});
