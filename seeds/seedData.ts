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

    const matchesData = [
      { matchId: '1', home: 'Manchester United', visitor: 'Liverpool' },
      { matchId: '2', home: 'Arsenal', visitor: 'Chelsea' },
      { matchId: '3', home: 'Manchester City', visitor: 'Tottenham' },
      { matchId: '4', home: 'Real Madrid', visitor: 'Barcelona' },
      { matchId: '5', home: 'Atletico Madrid', visitor: 'Sevilla' },
      { matchId: '6', home: 'Valencia', visitor: 'Villarreal' },
      { matchId: '7', home: 'PSG', visitor: 'Bayern Munich' },
      { matchId: '8', home: 'AC Milan', visitor: 'Inter Milan' },
      { matchId: '9', home: 'Porto', visitor: 'Benfica' },
    ];

    const matchDocs = await Promise.all(
      matchesData.map((m) =>
        Match.create({
          matchId: m.matchId,
          home: getTeam(m.home),
          visitor: getTeam(m.visitor),
        })
      )
    );

    const gameweeksData = [
      {
        number: 1,
        startDate: new Date('2025-10-15'),
        endDate: new Date('2025-10-22'),
        status: 'active',
        isActive: true,
        matches: matchDocs.slice(0, 3).map((m) => m._id),
      },
      {
        number: 1,
        startDate: new Date('2025-11-01'),
        endDate: new Date('2025-11-08'),
        status: 'pending',
        isActive: false,
        matches: matchDocs.slice(3, 6).map((m) => m._id),
      },
      {
        number: 1,
        startDate: new Date('2025-12-01'),
        endDate: new Date('2025-12-10'),
        status: 'pending',
        isActive: false,
        matches: matchDocs.slice(6, 9).map((m) => m._id),
      },
    ];

    const gameweekDocs = await Gameweek.insertMany(gameweeksData);

    const sampleSurvivors = [
      {
        name: 'Liga Premier 2025',
        startDate: new Date('2025-10-15'),
        lives: 3,
        gameweeks: [gameweekDocs[0]._id],
      },
      {
        name: 'La Liga Survivor',
        startDate: new Date('2025-11-01'),
        lives: 3,
        gameweeks: [gameweekDocs[1]._id],
      },
      {
        name: 'Champions League Knockout',
        startDate: new Date('2025-12-01'),
        lives: 3,
        gameweeks: [gameweekDocs[2]._id],
      },
    ];

    await Survivor.insertMany(sampleSurvivors);
    console.log('✅ Survivors seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding survivors:', error);
  }
};

export default seedSurvivors;
