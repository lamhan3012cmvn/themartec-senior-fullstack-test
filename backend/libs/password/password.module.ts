import { Module } from '@nestjs/common';
import { pbkdf2Sync } from 'crypto';

export interface PasswordGenerator {
  generateKey: (secret: string) => string;
  compareKey: (secret: string, key: string) => boolean;
}

class PasswordGeneratorImplement implements PasswordGenerator {
  generateKey(secret: string): string {
    return pbkdf2Sync(secret, 'salt', 100000, 256, 'sha512').toString();
  }
  compareKey: (secret: string, key: string) => boolean = (secret, key) => {
    return this.generateKey(secret) === key;
  };
}

export const PASSWORD_GENERATOR = 'PasswordGenerator';

@Module({
  providers: [
    {
      provide: PASSWORD_GENERATOR,
      useClass: PasswordGeneratorImplement,
    },
  ],
  exports: [PASSWORD_GENERATOR],
})
export class PasswordModule {}
