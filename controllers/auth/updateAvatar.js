const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");

const updateAvatar = async (req, res, next) => {
  console.log("test"); // Se afișează un mesaj de test în consolă.

  try {
    if (!req.file) {
      return res.status(404).json({ error: "Nu exista fisier de incarcat!" });
      // Dacă nu există fișier în cerere, se returnează o eroare 404.
    }

    const uniqFilename = `${req.user._id}-${Date.now()}${path.extname(
      req.file.originalname
    )}`;
    // Se creează un nume unic pentru fișierul de avatar,
    // folosind ID-ul utilizatorului și marcajul de timp.

    const destinationPath = path.join(
      __dirname,
      `../../public/avatars/${uniqFilename}`
    ); // Se definește calea de destinație pentru fișierul final de avatar.

    // Utilizează Jimp pentru redimensionare, ajustarea calității și transformare în tonuri de gri
    await Jimp.read(req.file.path)
      .then((image) => {
        return image
          .resize(250, 250)
          .quality(60)
          .greyscale()
          .writeAsync(destinationPath);
        // Se redimensionează, ajustează calitatea și se convertește la tonuri de gri,
        // apoi se salvează în calea de destinație.
      })
      .then(() => {
        fs.unlinkSync(req.file.path);
        // Se șterge fișierul original după redimensionare,
        // ajustare calitate și transformare în tonuri de gri.
      })
      .catch((error) => {
        throw error; // Se aruncă o excepție în caz de eroare în timpul procesării imaginii cu Jimp.
      });

    req.user.avatarUrl = `/avatars/${uniqFilename}`;
    // Se actualizează calea avatarului în obiectul utilizatorului.
    await req.user.save(); // Se salvează modificările în obiectul utilizatorului în baza de date.

    res.status(200).json({ avatarUrl: req.user.avatarUrl }); // Se trimite răspunsul HTTP cu URL-ul noului avatar.
  } catch (error) {
    res.status(404).json({ error: error.message }); // Se returnează o eroare 404 în caz de orice altă eroare și se trece la middleware-ul următor în lanț.
    next(error);
  }
};

module.exports = updateAvatar;
