// ces fonctions utilisent les  librairie <AccelStepper.h> et <math.h>
// il s'agit du code de deplacement d'une base roulante (2roues) avec des moteurs pas a pas

//déclaration Moteur
AccelStepper _MotorLeft(1, step_pin_motor1, dir_pin_motor1);
AccelStepper _MotorRight(1, step_pin_motor2, dir_pin_motor2);

//***********************************************************************

/*procedure pour avancer/reculer: Translation
  param: distance en cm
  avancer: distance positive, reculer: distance negative
  exemple: Translation(20), Translation(-25)
*/
void Translation(float distance) {
  int trajet = DistenceVersPas(distance, rayon, motor_step, coef_step);  //trajet en step
  _MotorLeft.move(trajet);
  _MotorRight.move(-trajet);
  while (_MotorLeft.distanceToGo() != 0 and _MotorRight.distanceToGo() != 0) { 
    _MotorRight.run();
    _MotorLeft.run();
  }
}

//***********************************************************************

/*procedure pour tourner: Rotation
  param: angle en degre
  Pour tourner à droite: angle positif, à gauche: angle négatif (sens horaire)
  exemple: Rotation(90), Rotation -(45)
*/
void Rotation(float angle) {
  int trajet = AngleVersPas(angle, motor_step, coef_step, l_robot);  //trajet en step
  _MotorRight.move(trajet);                                          //move donne une distance a ateindre au moteur
  _MotorLeft.move(trajet);
  while (_MotorRight.distanceToGo() != 0 and _MotorLeft.distanceToGo() != 0) {  //distanceToGo donne la distance entre la position actuelle et la position cible.
    while (digitalRead(detectionPin) == HIGH) {
      _MotorRight.stop();  //stop stop le moteur et enleve le move
      _MotorLeft.stop();
      delay(500);
      _MotorRight.move(trajet);      
      _MotorLeft.move(trajet);
    }
    _MotorLeft.run();
    _MotorRight.run();  //run permet d'avancer le moteur
    trajet = _MotorRight.distanceToGo();
  }
}

//***********************************************************************

/*procedure de pivot sur roue droite: PivotD
  param: angle en degre
  pour pivoter sur la roue droite: PivotD. Pour tourner vers la droite: Angle Positif, gauche: angle négatif (sens horaire)
  exemple: PivotD(-45), PivotD(90)
*/
void PivotD(float angle) {
  _MotorLeft.move(2 * AngleVersPas(angle, motor_step, coef_step, l_robot));
  while (_MotorLeft.distanceToGo() != 0  and digitalRead(detectionPin) == LOW) {
    _MotorLeft.run();
  }
}
//***********************************************************************

/*procedure de pivot sur roue gauche: PivotG
  param: angle en degre
  pour pivoter sur la roue gauche: PivotG. Pour tourner vers la droite: angle Positif, gauche: angle négatif (sens horaire)
  exemple: PivotG(-45), PivotG(90)
*/
void PivotG(float angle) {
  _MotorRight.move(2 * AngleVersPas(angle, motor_step, coef_step, l_robot));
  while (_MotorRight.distanceToGo() != 0 and digitalRead(detectionPin) == LOW) {
    _MotorRight.run();
  }
}

//***********************************************************************

/*procedure de deplacement a partir de coordonees: Goto
  parmam: x_deb et x_fin: corespond au co du robot sur la longueur de la table en cm
        y_deb et y_fin: corespond au co du robot sur la largeur de la table en cm
        teta_deb et teta_fin corespond a l'angle du robot en degre par raport au public (0 degre = face au public)
  exemple: Goto(0,0,0,0,50,45);
*/
void Goto(long x_deb, long y_deb, long teta_deb, long x_fin, long y_fin, long teta_fin) {
  float dist;
  float x = x_fin - x_deb;
  float y = y_fin - y_deb;
  dist = sqrt((x * x + y * y));  //on calcule la distance (pythagore)
  if (dist == 0) {
    Rotation(PlusPetitAngle(teta_fin - teta_deb));
  } 
  else {
     float angle_de_mouv = AngleDeplacement(x, y, dist);  //on calcule l'angle de deplacement
     Rotation(PlusPetitAngle(-teta_deb + angle_de_mouv));
     Translation(dist);
     Rotation(PlusPetitAngle(-angle_de_mouv + teta_fin));
  }
}

//***********************************************************************

/*fonction qui traduit une distance en nb de pas
  param: distance en cm
  return: nombre de pas
*/
float DistenceVersPas(float distance, float rayon, int motor_step, int coef_step) {  //distance en mm, rayon de la roue en mm, pas(200 ou 400 en demi-pas), retourne le nb de pas: nb_pas
  return distance / ((2 * M_PI * rayon) / (motor_step * coef_step));                 //nb_pas= distance/((2pi*rayon)/step)
}

//***********************************************************************

/*fonction qui converti un angle en pas
  param: angle en degre
  return: nombre de pas
*/
float AngleVersPas(float angle, int motor_step, int coef_step, float l_robot) {
  float dist = (l_robot * M_PI) * (angle / 360);
  return DistenceVersPas(dist, rayon, motor_step, coef_step);
}

//***********************************************************************

/*fonction qui calcul l'angle de deplacemlent
  param: x,y (calcules dans Goto) et la distance à parcourir en metre
  return: angle de deplacement en degre
*/
float AngleDeplacement(float x, float y, float dist) {
  if (x == 0) {
    if (y > 0) {
      return (90);
    } else {
      return (-90);
    }
  } else if (y == 0) {
    if (x > 0) {
      return (0);
    } else {
      return (180);
    }
  } else if (x > 0 && y > 0) {
    return (RadToDeg(acos(x / dist)));
  } else if (x < 0 && y < 0) {
    return (-RadToDeg(acos(x / dist)));
  } else if (x < 0 && y > 0) {
    return (RadToDeg(acos(x / dist)));
  } else if (x > 0 && y < 0) {
    return (-RadToDeg(acos(x / dist)));
  }
  //cas impossible, on ne devrait jamais atteindre ce cas
  return -1;
}

//***********************************************************************

/*fonction qui renvoie l'angle le plus petit en changeant le sens de rotation (sens horaire/trigo)
  param: angle en degre (positif ou negatif)
  return: angle en degre
*/
float PlusPetitAngle(float angle) {
  if (angle > 180) {
    return (angle - 360);
  } else if (angle > -180) {
    return (angle);
  } else {
    return (angle + 360);
  }
}

//***********************************************************************

/*fonction qui converti un angle en radian vers degre
  param: angle en radian
  return: angle en degre
*/
float RadToDeg(float angle) {
  return (angle * 180 / M_PI);
}

//***********************************************************************

