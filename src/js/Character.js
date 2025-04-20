/**
 * Класс персонажа.
 */
export default class Character {

  /**
   * Валидные типы персонажа.
   */
  static #validTypes = [
    'Bowman', 
    'Swordsman', 
    'Magician', 
    'Demon', 
    'Undead', 
    'Zombie'
  ];

  constructor(name, type) {
    // Валидация аргументов
    this.#validateNameAndType(name, type);

    // Свойства персонажа
    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = 0;
    this.defense = 0;
  }

  /**
   * Установка атрибутов персонажа.
   */
  setAttributes() {
    // Установка атрибутов в зависимости от типа персонажа.
    // Метод должен быть переопределен в дочернем классе.
  }

  /**
   * Вывод атрибутов персонажа в консоль.
   */
  showAttributes() {
    console.log(
      `Имя: ${this.name},\n`
      + `Тип: ${this.type},\n`
      + `Здоровье: ${this.health},\n`
      + `Уровень: ${this.level},\n`
      + `Атака: ${this.attack},\n`
      + `Защита: ${this.defense}`
    );
  }

  /**
   * Повышение уровня персонажа.
   * @throws {Error} - Если персонаж мертв.
   */
  levelUp() {
    if (this.health > 0) {
      this.level += 1;
      this.attack = this.attack * 1.2;
      this.defense = this.defense * 1.2;
      this.health = 100;

      return;
    }
    throw new Error('Персонаж мертв. Нельзя повысить уровень умершего персонажа.');
  }

  /**
   * Нанесение урона персонажу.
   * @param {number} points - Количество наносимого урона.
   */
  damage(points) {
    if (this.health > 0 && points > 0) {
      this.health -= points * (1 - this.defense / 100);
      if (this.health < 0) this.health = 0;
    }
  }

  /**
   * Валидация имени и типа персонажа.
   * 
   * @param {string} name - Имя персонажа.
   * @param {string} type - Тип персонажа.
   * 
   * @throws {Error} - Если имя или тип персонажа некорректны.
   */
  #validateNameAndType(name, type) {
    if (typeof name !== 'string' || name.length < 2 || name.length > 10) {
      throw new Error('Имя должно быть строкой длиной от 2 до 10 символов.');
    }

    if (!Character.#validTypes.includes(type)) {
      throw new Error('Некорректный тип персонажа.');
    }
  }
}
