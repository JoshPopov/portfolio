
import { photos, type Photo, type InsertPhoto } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPhotos(): Promise<Photo[]>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
}

export class DatabaseStorage implements IStorage {
  async getPhotos(): Promise<Photo[]> {
    return await db.select().from(photos);
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const [photo] = await db
      .insert(photos)
      .values(insertPhoto)
      .returning();
    return photo;
  }
}

export const storage = new DatabaseStorage();
