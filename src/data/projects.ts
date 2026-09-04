export interface PlanRoom {
  name: string;
  area: string;
}

export interface Plan {
  slug: string;
  label: string;
  roomsCount: number;
  area: string;
  floor: string;
  priceEstimate: string;
  image: string;
  rooms: PlanRoom[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'business' | 'premium' | 'deluxe';
  categoryLabel: string;
  image: string;
  detailImage: string;
  status: string;
  deliveryQuarter: string;
  sourceUrl: string;
  location: string;
  district: string;
  priceFrom: string;
  pricePerMeter: string;
  installment: string;
  floors: string;
  ceilingHeight: string;
  parkingSpots: string;
  details: string;
  facts: string[];
  features: string[];
  gallery: string[];
  plans: Plan[];
  documentsHref: string;
  neighborhood: string;
  liveStreams?: { label: string; href: string }[];
  lat?: number;
  lng?: number;
}

export const projects: Project[] = [
  {
    id: '01',
    slug: 'lumiere-residence',
    title: 'LUMIÈRE RESIDENCE',
    subtitle: 'Коллекция премиальных резиденций в самом сердце столицы',
    category: 'deluxe',
    categoryLabel: 'De Luxe Class',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1920&q=85',
    status: 'Строится',
    deliveryQuarter: 'IV кв. 2026',
    sourceUrl: '#',
    location: 'Metropolis Central, Grand Boulevard 12',
    district: 'Metropolis Central',
    priceFrom: '$118 000',
    pricePerMeter: 'от $1 650 / м²',
    installment: '0% рассрочка на 30 месяцев',
    floors: '24 этажа',
    ceilingHeight: '3.45 м',
    parkingSpots: '180 машиномест',
    details: 'Флагманский жилой комплекс с авторской неоклассической архитектурой, панорамным остеклением от пола до потолка и приватным внутренним садом только для резидентов.',
    facts: [
      '24 этажа панорамных видов',
      'Квартиры от 48 м² до 192 м²',
      'Высота потолков 3.45 м',
      'Гранд-лобби с консьерж-сервисом 24/7'
    ],
    features: [
      'Приватный парк во дворе 1.2 га',
      'Двухуровневый подземный паркинг с зарядками EV',
      'Закрытый клубный лаунж и коворкинг',
      'Система очистки воздуха и фильтрации воды'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85'
    ],
    plans: [
      {
        slug: '1-room-54',
        label: '1-комнатная люкс 54 м²',
        roomsCount: 1,
        area: '54 м²',
        floor: '4-18 этаж',
        priceEstimate: 'от $89 100',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Прихожая с гардеробной', area: '6.8 м²' },
          { name: 'Кухня-гостиная студио', area: '24.2 м²' },
          { name: 'Мастер-спальня', area: '16.5 м²' },
          { name: 'Дизайнерский санузел', area: '6.5 м²' }
        ]
      },
      {
        slug: '2-room-88',
        label: '2-комнатная с террасой 88 м²',
        roomsCount: 2,
        area: '88 м²',
        floor: '7-22 этаж',
        priceEstimate: 'от $145 200',
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Просторная гостиная', area: '29.4 м²' },
          { name: 'Кухня-столовая', area: '18.1 м²' },
          { name: 'Мастер-спальня с ванной', area: '21.0 м²' },
          { name: 'Вторая спальня / кабинет', area: '14.5 м²' },
          { name: 'Панорамная лоджия', area: '5.0 м²' }
        ]
      },
      {
        slug: '3-room-136',
        label: '3-комнатная Royal 136 м²',
        roomsCount: 3,
        area: '136 м²',
        floor: '12-24 этаж',
        priceEstimate: 'от $224 400',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Гранд-гостиная', area: '42.6 м²' },
          { name: 'Кухня-остров', area: '22.4 м²' },
          { name: 'Мастер-сьют с гардеробом', area: '26.8 м²' },
          { name: 'Детская комната', area: '18.5 м²' },
          { name: 'Кабинет / гостевая', area: '15.7 м²' },
          { name: '2 санузла и постирочная', area: '10.0 м²' }
        ]
      }
    ],
    documentsHref: '#',
    neighborhood: 'В шаговой доступности правительственный квартал, центральный оперный театр, бутики и рестораны высокой кухни.'
  },
  {
    id: '02',
    slug: 'vista-waterfront',
    title: 'VISTA WATERFRONT',
    subtitle: 'Апартаменты на первой береговой линии с собственной мариной',
    category: 'premium',
    categoryLabel: 'Premium Waterfront',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1920&q=85',
    status: 'Сдача в 2026',
    deliveryQuarter: 'II кв. 2026',
    sourceUrl: '#',
    location: 'Marina Waterfront, Promenade Bay 8',
    district: 'Marina District',
    priceFrom: '$96 000',
    pricePerMeter: 'от $1 420 / м²',
    installment: 'Рассрочка до 24 месяцев с взносом 25%',
    floors: '19 этажей',
    ceilingHeight: '3.30 м',
    parkingSpots: '140 машиномест',
    details: 'Архитектурный ансамбль прямо у набережной. Уникальное сочетание морского бриза, водной глади и развитой клубной инфраструктуры.',
    facts: [
      'Первая линия у воды',
      'Террасы с видом на залив и закат',
      'Приватный причал для катеров',
      'Фитнес-клуб с открытым инфинити-бассейном'
    ],
    features: [
      'Набережная для пробежек прямо у порога',
      'Ресторан средиземноморской кухни в стилобате',
      'Бесшумные скоростные лифты Otis Sky',
      'Энергоэффективные солнцезащитные фасады'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85'
    ],
    plans: [
      {
        slug: '1-room-46',
        label: '1-комнатная студия 46 м²',
        roomsCount: 1,
        area: '46 м²',
        floor: '2-12 этаж',
        priceEstimate: 'от $65 320',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Гостиная-кухня', area: '26.2 м²' },
          { name: 'Спальная зона', area: '12.4 м²' },
          { name: 'Балкон с видом на залив', area: '4.2 м²' },
          { name: 'Ванная комната', area: '5.2 м²' }
        ]
      },
      {
        slug: '2-room-76',
        label: '2-комнатная с видом на воду 76 м²',
        roomsCount: 2,
        area: '76 м²',
        floor: '5-18 этаж',
        priceEstimate: 'от $107 920',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Панорамная гостиная', area: '26.8 м²' },
          { name: 'Изолированная кухня', area: '14.6 м²' },
          { name: 'Мастер-спальня', area: '19.2 м²' },
          { name: 'Гардеробная и санузел', area: '8.4 м²' },
          { name: 'Лоджия', area: '7.0 м²' }
        ]
      }
    ],
    documentsHref: '#',
    neighborhood: 'Яхтенный клуб, пляжный клуб, прогулочный молл и парковая набережная протяженностью 4 км.'
  },
  {
    id: '03',
    slug: 'the-royale-empire',
    title: 'THE ROYALE EMPIRE',
    subtitle: 'Аристократическое спокойствие в посольском квартале',
    category: 'deluxe',
    categoryLabel: 'De Luxe Class',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1920&q=85',
    status: 'Сдача в 2025',
    deliveryQuarter: 'IV кв. 2025',
    sourceUrl: '#',
    location: 'Royal Embassy Quarter, Ambassador Way 5',
    district: 'Embassy Quarter',
    priceFrom: '$165 000',
    pricePerMeter: 'от $1 880 / м²',
    installment: 'Индивидуальные программы оплаты от инвестора',
    floors: '14 этажей',
    ceilingHeight: '3.60 м',
    parkingSpots: '96 машиномест',
    details: 'Клубный особняк премиум-класса всего на 64 резиденции. Натуральный мраморный фасад, латунные декоративные элементы и высочайший уровень приватности.',
    facts: [
      'Всего 64 эксклюзивные квартиры',
      'Потолки 3.60 м с лепными карнизами',
      'Отделка White Box с акустической изоляцией',
      'Швейцарская служба портье'
    ],
    features: [
      'Приватный SPA-комплекс и сауна для жильцов',
      'Винный погреб с индивидуальными ячейками',
      'Круглосуточная вооруженная охрана периметра',
      'Лифты с биометрическим доступом на этаж'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85'
    ],
    plans: [
      {
        slug: '2-room-94',
        label: '2-комнатная Embassy 94 м²',
        roomsCount: 2,
        area: '94 м²',
        floor: '3-10 этаж',
        priceEstimate: 'от $176 720',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Холл-галерея', area: '11.5 м²' },
          { name: 'Каминная гостиная', area: '34.2 м²' },
          { name: 'Кухня премиум-класса', area: '16.8 м²' },
          { name: 'Спальня с гардеробной', area: '24.0 м²' },
          { name: 'Мраморная ванная комната', area: '7.5 м²' }
        ]
      },
      {
        slug: 'penthouse-182',
        label: 'Пентхаус Royal с террасой 182 м²',
        roomsCount: 4,
        area: '182 м²',
        floor: '14 этаж (верхний уровень)',
        priceEstimate: 'от $342 160',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Парадная гостиная с террасой', area: '65.0 м²' },
          { name: 'Кухня шеф-повара', area: '24.5 м²' },
          { name: 'Мастер-спальня King Size', area: '32.0 м²' },
          { name: 'Гостевая спальня', area: '20.5 м²' },
          { name: 'Кабинет-библиотека', area: '18.0 м²' },
          { name: 'Открытая лаунж-терраса', area: '22.0 м²' }
        ]
      }
    ],
    documentsHref: '#',
    neighborhood: 'Закрытый посольский район, вековые платаны, тихие бульвары и респектабельное окружение.'
  },
  {
    id: '04',
    slug: 'skyline-horizon',
    title: 'SKYLINE HORIZON',
    subtitle: 'Высотная доминанта финансового района с головокружительными видами',
    category: 'business',
    categoryLabel: 'Business Class',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85',
    status: 'Строится',
    deliveryQuarter: 'III кв. 2027',
    sourceUrl: '#',
    location: 'Skyline Financial District, Tower Road 44',
    district: 'Financial District',
    priceFrom: '$84 000',
    pricePerMeter: 'от $1 350 / м²',
    installment: '0% рассрочка на 36 месяцев без переплат',
    floors: '34 этажа',
    ceilingHeight: '3.25 м',
    parkingSpots: '320 машиномест',
    details: 'Ультрасовременная стеклянная башня для динамичных профессионалов. Умный дом последнего поколения, коворкинг на 20-м этаже и вертолетная площадка на крыше.',
    facts: [
      '34 этажа технологичного комфорта',
      'Система Smart Home в каждой квартире',
      'Панорамный Sky Lounge для встреч и отдыха',
      'Прямой доступ в подземный торговый молл'
    ],
    features: [
      'Высокоскоростные панорамные лифты',
      'Умный климат-контроль с мобильным приложением',
      'Фитнес-зал с тренажерами Technogym',
      'Зимний сад на эксплуатируемой кровле'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85'
    ],
    plans: [
      {
        slug: 'studio-41',
        label: 'Студия Smart Sky 41 м²',
        roomsCount: 1,
        area: '41 м²',
        floor: '6-28 этаж',
        priceEstimate: 'от $55 350',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Зона гостиной и отдыха', area: '22.0 м²' },
          { name: 'Кухонная зона с барной стойкой', area: '10.5 м²' },
          { name: 'Санузел с тропическим душем', area: '4.8 м²' },
          { name: 'Встроенная гардеробная система', area: '3.7 м²' }
        ]
      },
      {
        slug: '2-room-72',
        label: '2-комнатная Panorama 72 м²',
        roomsCount: 2,
        area: '72 м²',
        floor: '15-32 этаж',
        priceEstimate: 'от $97 200',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Угловая видовая гостиная', area: '28.0 м²' },
          { name: 'Эргономичная кухня', area: '13.2 м²' },
          { name: 'Спальня с панорамным окном', area: '18.4 м²' },
          { name: 'Санузел и гардероб', area: '12.4 м²' }
        ]
      }
    ],
    documentsHref: '#',
    neighborhood: 'Деловой центр столицы, штаб-квартиры международных банков, метрополитен и фитнес-центры.'
  },
  {
    id: '05',
    slug: 'botanica-oasis',
    title: 'BOTANICA OASIS',
    subtitle: 'Эко-резиденция с собственным парком и цветущими террасами',
    category: 'premium',
    categoryLabel: 'Eco-Premium',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
    status: 'Сдача в 2027',
    deliveryQuarter: 'I кв. 2027',
    sourceUrl: '#',
    location: 'Green Park Avenue, Botanical Lane 19',
    district: 'Green Park Avenue',
    priceFrom: '$104 000',
    pricePerMeter: 'от $1 480 / м²',
    installment: 'Первоначальный взнос 20%, рассрочка до 28 месяцев',
    floors: '16 этажей',
    ceilingHeight: '3.35 м',
    parkingSpots: '165 машиномест',
    details: 'Уникальный жилой комплекс с вертикальным озеленением фасадов, прогулочными мостиками и ботаническими оранжереями прямо во дворах.',
    facts: [
      'Более 5 000 деревьев и кустарников на территории',
      'Семейные планировки с просторными лоджиями',
      'Безопасный двор без машин с природными эко-площадками',
      'Центральная система кондиционирования Daikin'
    ],
    features: [
      'Собственный частный детский сад на территории',
      'Тропа здоровья и йога-поляна в саду',
      'Колясочные и лапомойки для питомцев в каждом лобби',
      'Зарядные станции для велосипедов и самокатов'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85'
    ],
    plans: [
      {
        slug: '2-room-68',
        label: '2-комнатная Garden View 68 м²',
        roomsCount: 2,
        area: '68 м²',
        floor: '3-14 этаж',
        priceEstimate: 'от $100 640',
        image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Кухня-гостиная с выходом в сад', area: '25.4 м²' },
          { name: 'Главная спальня', area: '17.6 м²' },
          { name: 'Детская комната', area: '13.2 м²' },
          { name: 'Ванная комната', area: '5.8 м²' },
          { name: 'Зеленая лоджия', area: '6.0 м²' }
        ]
      },
      {
        slug: '3-room-112',
        label: '3-комнатная Family Deluxe 112 м²',
        roomsCount: 3,
        area: '112 м²',
        floor: '6-16 этаж',
        priceEstimate: 'от $165 760',
        image: 'https://images.unsplash.com/photo-1502005229762-ee152d87e076?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Большая семейная гостиная', area: '36.5 м²' },
          { name: 'Кухня с островом', area: '18.0 м²' },
          { name: 'Мастер-спальня с гардеробом', area: '21.5 м²' },
          { name: 'Две детские комнаты', area: '24.0 м²' },
          { name: '2 санузла и хозяйственный блок', area: '12.0 м²' }
        ]
      }
    ],
    documentsHref: '#',
    neighborhood: 'Парк культуры, престижная билингвальная школа, теннисная академия и медицинский центр.'
  },
  {
    id: '06',
    slug: 'aurora-riverfront',
    title: 'AURORA RIVERFRONT',
    subtitle: 'Панорамные пентхаусы и видовые террасы на западном побережье',
    category: 'deluxe',
    categoryLabel: 'De Luxe Class',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1920&q=85',
    status: 'Сдан',
    deliveryQuarter: 'Готов к заселению',
    sourceUrl: '#',
    location: 'Riverside Bay, Sunset Boulevard 77',
    district: 'Riverside Bay',
    priceFrom: '$140 000',
    pricePerMeter: 'от $1 720 / м²',
    installment: 'Ключи сразу при взносе 30%',
    floors: '18 этажей',
    ceilingHeight: '3.50 м',
    parkingSpots: '110 машиномест',
    details: 'Эксклюзивный завершенный объект клубного формата. Готовые квартиры с дизайнерской отделкой и премиальной сантехникой от европейских брендов.',
    facts: [
      'Дом сдан и введен в эксплуатацию',
      'Готовые свидетельства о собственности',
      'Дизайнерское гранд-лобби со стеклянным куполом',
      'Уникальные пентхаусы с персональными террасами'
    ],
    features: [
      'Консьерж-служба европейского стандарта',
      'Подземный паркинг с автомойкой',
      'Приватный тренажерный зал только для жильцов',
      'Каминный зал для переговоров и закрытых приемов'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    ],
    plans: [
      {
        slug: '2-room-82',
        label: '2-комнатная Sunset View 82 м²',
        roomsCount: 2,
        area: '82 м²',
        floor: '4-12 этаж',
        priceEstimate: 'от $141 040',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Гостиная с видовым эркером', area: '31.2 м²' },
          { name: 'Кухня с обеденной зоной', area: '16.5 м²' },
          { name: 'Спальня с гардеробом', area: '19.8 м²' },
          { name: 'Санузел и гостевой туалет', area: '8.5 м²' },
          { name: 'Французский балкон', area: '6.0 м²' }
        ]
      },
      {
        slug: 'penthouse-164',
        label: 'Пентхаус Grand Aurora 164 м²',
        roomsCount: 4,
        area: '164 м²',
        floor: '18 этаж (верхний уровень)',
        priceEstimate: 'от $282 080',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=85',
        rooms: [
          { name: 'Гранд-салон с панорамой 270°', area: '58.0 м²' },
          { name: 'Кухня-остров', area: '22.0 м²' },
          { name: 'Мастер-сьют с террасой', area: '30.0 м²' },
          { name: 'Две спальни с ванными', area: '34.0 м²' },
          { name: 'Круговая видовая терраса', area: '20.0 м²' }
        ]
      }
    ],
    documentsHref: '#',
    neighborhood: 'Парк на набережной, яхтенный пирс, рестораны высокой гастрономии и художественные галереи.'
  }
];
