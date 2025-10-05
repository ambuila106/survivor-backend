import Survivor from '../models/Survivor';

const seedSurvivors = async () => {
  try {
    const existing = await Survivor.countDocuments();
    if (existing > 0) {
      console.log('⚠️  Survivors already exist, skipping seed.');
      return;
    }

    const sampleSurvivors = [
      {
        name: "Liga Premier 2025",
        startDate: new Date('2025-01-15'),
        lives: 3,
        gameweeks: [
          {
            number: 1,
            startDate: new Date('2025-01-15'),
            endDate: new Date('2025-01-22'),
            status: 'active',
            isActive: true,
            matches: [
              {
                matchId: "1",
                home: { name: "Manchester United", flag: "🏴" },
                visitor: { name: "Liverpool", flag: "🏴" },
              },
              {
                matchId: "2",
                home: { name: "Arsenal", flag: "🏴" },
                visitor: { name: "Chelsea", flag: "🏴" },
              },
              {
                matchId: "3",
                home: { name: "Manchester City", flag: "🏴" },
                visitor: { name: "Tottenham", flag: "🏴" },
              },
            ],
          },
        ],
      },
      {
        name: "La Liga Survivor",
        startDate: new Date('2025-02-01'),
        lives: 3,
        gameweeks: [
          {
            number: 1,
            startDate: new Date('2025-02-01'),
            endDate: new Date('2025-02-08'),
            status: 'pending',
            isActive: false,
            matches: [
              {
                matchId: "4",
                home: { name: "Real Madrid", flag: "🇪🇸" },
                visitor: { name: "Barcelona", flag: "🇪🇸" },
              },
              {
                matchId: "5",
                home: { name: "Atletico Madrid", flag: "🇪🇸" },
                visitor: { name: "Sevilla", flag: "🇪🇸" },
              },
              {
                matchId: "6",
                home: { name: "Valencia", flag: "🇪🇸" },
                visitor: { name: "Villarreal", flag: "🇪🇸" },
              },
            ],
          },
        ],
      },
      {
        name: "Champions League Knockout",
        startDate: new Date('2025-03-01'),
        lives: 3,
        gameweeks: [
          {
            number: 1,
            startDate: new Date('2025-03-01'),
            endDate: new Date('2025-03-10'),
            status: 'pending',
            isActive: false,
            matches: [
              {
                matchId: "7",
                home: { name: "PSG", flag: "🇫🇷" },
                visitor: { name: "Bayern Munich", flag: "🇩🇪" },
              },
              {
                matchId: "8",
                home: { name: "AC Milan", flag: "🇮🇹" },
                visitor: { name: "Inter Milan", flag: "🇮🇹" },
              },
              {
                matchId: "9",
                home: { name: "Porto", flag: "🇵🇹" },
                visitor: { name: "Benfica", flag: "🇵🇹" },
              },
            ],
          },
        ],
      },
    ];

    await Survivor.insertMany(sampleSurvivors);
    console.log('✅ Sample survivors seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding survivors:', error);
  }
};

export default seedSurvivors;