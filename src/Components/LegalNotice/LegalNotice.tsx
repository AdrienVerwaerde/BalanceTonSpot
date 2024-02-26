import './LegalNotice.css';

export default function LegalNotice() {
    return (
        <div className="legalMentionsContainer">
            <h1 className="legalMentionsHeading">Mentions Légales</h1>

            <div className="legalMentionsSection">
                <h2 className="legalMentionsSubheading">Conditions Générales d'Utilisation</h2>
                <p className="legalMentionsText">
                    L'utilisation de ce site web est soumise aux conditions générales d'utilisation suivantes. En accédant à ce site,
                    vous acceptez ces conditions sans réserve. Nous nous réservons le droit de modifier ces conditions à tout moment,
                    donc veuillez les vérifier régulièrement.
                </p>
            </div>

            <div className="legalMentionsSection">
                <h2 className="legalMentionsSubheading">Politique de Confidentialité</h2>
                <p className="legalMentionsText">
                    Nous nous engageons à protéger la confidentialité des informations personnelles des utilisateurs. Toutes les données
                    personnelles recueillies sur le site sont traitées avec la plus grande confidentialité. Pour plus d'informations,
                    veuillez consulter notre politique de confidentialité complète.
                </p>
            </div>

            <div className="legalMentionsSection">
                <h2 className="legalMentionsSubheading">Droits d'Auteur</h2>
                <p className="legalMentionsText">
                    Le contenu de ce site, y compris les textes, graphiques, images et autres, est protégé par le droit d'auteur et appartient
                    à la société ou à ses partenaires. Toute reproduction, modification, publication, adaptation de tout ou partie des éléments
                    du site, quel que soit le moyen ou le processus utilisé, est interdite, sauf autorisation écrite préalable.
                </p>
            </div>

            <div className="legalMentionsSection">
                <h2 className="legalMentionsSubheading">Limitation de Responsabilité</h2>
                <p className="legalMentionsText">
                    Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut
                    toutefois contenir des inexactitudes, des omissions ou des lacunes. Si vous constatez une lacune, erreur ou ce qui paraît être
                    un dysfonctionnement, merci de bien vouloir le signaler par email en décrivant le problème de la manière la plus précise possible.
                </p>
            </div>

            <div className="legalMentionsSection">
                <h2 className="legalMentionsSubheading">Contact</h2>
                <p className="legalMentionsText">
                    Pour toute question ou demande d'information concernant le site, ou toute notification de contenu inapproprié ou illégal,
                    l'utilisateur peut contacter l'éditeur à l'adresse email suivante : contact@example.com.
                </p>
            </div>
        </div>
    );
}
