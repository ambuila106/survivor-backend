import mongoose from 'mongoose';
import Survivor from '../models/Survivor';
import Team from '../models/Team';
import Match from '../models/Match';
import Gameweek from '../models/GameWeek';

const seedSurvivors = async () => {
  try {
    const existing = await Survivor.countDocuments();
    if (existing > 0) {
      console.log('⚠️  Survivors already exist, skipping seed.');
      return;
    }

    const teamsData = [
      { name: 'Manchester United', flag: '🏴' },
      { name: 'Liverpool', flag: '🏴' },
      { name: 'Arsenal', flag: '🏴' },
      { name: 'Chelsea', flag: '🏴' },
      { name: 'Manchester City', flag: '🏴' },
      { name: 'Tottenham', flag: '🏴' },
      { name: 'Real Madrid', flag: '🇪🇸' },
      { name: 'Barcelona', flag: '🇪🇸' },
      { name: 'Atletico Madrid', flag: '🇪🇸' },
      { name: 'Sevilla', flag: '🇪🇸' },
      { name: 'Valencia', flag: '🇪🇸' },
      { name: 'Villarreal', flag: '🇪🇸' },
      { name: 'PSG', flag: '🇫🇷' },
      { name: 'Bayern Munich', flag: '🇩🇪' },
      { name: 'AC Milan', flag: '🇮🇹' },
      { name: 'Inter Milan', flag: '🇮🇹' },
      { name: 'Porto', flag: '🇵🇹' },
      { name: 'Benfica', flag: '🇵🇹' },
    ];

    const existingTeams = await Team.find();
    const existingNames = existingTeams.map((t) => t.name);
    const newTeams = teamsData.filter((t) => !existingNames.includes(t.name));

    if (newTeams.length > 0) {
      await Team.insertMany(newTeams);
      console.log(`✅ Created ${newTeams.length} new teams`);
    }

    const allTeams = await Team.find();
    const getTeam = (name: string) => allTeams.find((t) => t.name === name)?._id;

    const week1Matches = [
      { matchId: '1', home: 'Manchester United', visitor: 'Liverpool' },
      { matchId: '2', home: 'Arsenal', visitor: 'Chelsea' },
      { matchId: '3', home: 'Manchester City', visitor: 'Tottenham' },
    ];
    const week2Matches = [
      { matchId: '4', home: 'Real Madrid', visitor: 'Barcelona' },
      { matchId: '5', home: 'Atletico Madrid', visitor: 'Sevilla' },
      { matchId: '6', home: 'Valencia', visitor: 'Villarreal' },
    ];
    const week3Matches = [
      { matchId: '7', home: 'PSG', visitor: 'Bayern Munich' },
      { matchId: '8', home: 'AC Milan', visitor: 'Inter Milan' },
      { matchId: '9', home: 'Porto', visitor: 'Benfica' },
    ];
    const week4Matches = [
      { matchId: '10', home: 'Chelsea', visitor: 'Manchester City' },
      { matchId: '11', home: 'Liverpool', visitor: 'Arsenal' },
      { matchId: '12', home: 'Tottenham', visitor: 'Manchester United' },
    ];

    const createMatchDocs = async (matches: any[]) =>
      Promise.all(
        matches.map((m) =>
          Match.create({
            matchId: m.matchId,
            home: getTeam(m.home),
            visitor: getTeam(m.visitor),
          })
        )
      );

    const matchWeek1 = await createMatchDocs(week1Matches);
    const matchWeek2 = await createMatchDocs(week2Matches);
    const matchWeek3 = await createMatchDocs(week3Matches);
    const matchWeek4 = await createMatchDocs(week4Matches);

    const gameweek1 = await Gameweek.create({
      number: 1,
      startDate: new Date('2025-10-15'),
      endDate: new Date('2025-10-22'),
      status: 'active',
      isActive: true,
      matches: matchWeek1.map((m) => m._id),
    });

    const gameweek2 = await Gameweek.create({
      number: 2,
      startDate: new Date('2025-10-23'),
      endDate: new Date('2025-10-30'),
      status: 'pending',
      isActive: false,
      matches: matchWeek2.map((m) => m._id),
    });

    const gameweek3 = await Gameweek.create({
      number: 3,
      startDate: new Date('2025-11-01'),
      endDate: new Date('2025-11-08'),
      status: 'pending',
      isActive: false,
      matches: matchWeek3.map((m) => m._id),
    });

    const gameweek4 = await Gameweek.create({
      number: 4,
      startDate: new Date('2025-11-09'),
      endDate: new Date('2025-11-16'),
      status: 'pending',
      isActive: false,
      matches: matchWeek4.map((m) => m._id),
    });

    const sampleSurvivors = [
      {
        name: 'Liga Premier 2025',
        startDate: new Date('2025-10-15'),
        lives: 3,
        gameweeks: [gameweek1._id, gameweek2._id, gameweek3._id, gameweek4._id],
      },
      {
        name: 'La Liga Survivor',
        startDate: new Date('2025-10-15'),
        lives: 3,
        gameweeks: [gameweek1._id, gameweek2._id, gameweek3._id, gameweek4._id],
      },
      {
        name: 'Champions League Knockout',
        startDate: new Date('2025-10-15'),
        lives: 3,
        gameweeks: [gameweek1._id, gameweek2._id, gameweek3._id, gameweek4._id],
      },
    ];

    await Survivor.insertMany(sampleSurvivors);
    console.log('✅ Survivors seeded successfully with 4 fixed gameweeks.');
  } catch (err) {
    const error = err as Error;
    console.error('❌ Error seeding survivors:', error.message);
  }
};

export default seedSurvivors;
