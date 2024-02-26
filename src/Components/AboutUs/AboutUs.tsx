import './AboutUs.css';

export default function AboutUs() {

    const team = [
        {
            nom: 'Ombeline PINOCHE',
            nickname: 'La Pinocherie',
            role: 'Développeuse Back-end',
            description: "Elle a une passion pour le développement backend, mais ce n'est pas pour autant qu'elle reste en arrière-plan. Aussi solide que les remparts de sa ville de coeur, Ombeline rempli sans une tuile son rôle de mur porteur pour coder des projets pétillants, à l'image de la bière qui la rafraîchit après une bonne journée de développement !",            
            photo: "/src/assets/images/stitch.jpg"
        },
        {
            nom: 'Gatien DOUY',
            nickname: "l'avocat",
            role: 'Développeur Back-end',
            description: "Gatien, avocat le jour, se transformait en développeur backend la nuit, fusionnant droit et technologie. Dans son petit appartement, il codait une application pour démocratiser l'accès au conseil juridique, unissant ses passions pour la justice et la programmation dans un projet révolutionnaire.",
            photo: "/src/assets/images/avocat.jpeg" 
        },
        {
            nom: 'Adrien VERWAERDE',
            nickname: 'Shorty',
            role: 'Développeur Front-end',
            description: 'Adrien, clown de cœur et développeur front-end de métier, jonglait avec le CSS comme avec ses balles colorées. Dans son univers, chaque ligne de code était un numéro de cirque, rendant le web aussi vivant et joyeux que ses spectacles.',
            photo: "/src/assets/images/adrien.png"
        },
        {
            nom: 'Diego GUMPEL',
            nickname: 'Les Grosses poches',
            role: 'Développeur Front-end',
            description: "Diego, programmeur à l'esprit pratique, tirait parti de ses grandes poches pour garder à portée de main clés USB et notes de code. Dans son petit bureau, il tissait des programmes ingénieux, ses poches symbolisant sa capacité à toujours avoir la bonne solution à portée de main.",
            photo: "/src/assets/images/diego.jpeg"
        }
    ];

    return (
        <div className="team-presentation">
            <h2>Notre Équipe</h2>
            <div className="members">
                {team.map((member, index) => (
                    <div key={index} className="member">
                        <img src={member.photo} alt={`Photo de ${member.nom}`} />
                        <h3>{member.nom}</h3>
                        <p> A.k.a : {member.nickname}</p>
                        <p>{member.role}</p>
                        <p>{member.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
